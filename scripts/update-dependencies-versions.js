const { spawnSync } = require('node:child_process');
const { readdirSync, writeFileSync } = require('node:fs');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

const COMPANY_PACKAGE_PREFIX = '@ask-ell/';

/**
 * @param {String} packageName
 */
function isACompanyPackage(packageName) {
  return packageName.includes(COMPANY_PACKAGE_PREFIX);
}

const TARGETED_PACKAGE_ID = process.argv[2];

const EXAMPLES_FOLDER = join(__dirname, '../examples');
const EXAMPLES_PACKAGES = readdirSync(EXAMPLES_FOLDER);

const NX_GRAPH_FILE_PATH = join(__dirname, '../tmp/graph.json');

const ROOT_PACKAGE_FILE_PATH = join(__dirname, `../package.json`);
const ROOT_PACKAGE_CONTENT = require(ROOT_PACKAGE_FILE_PATH);

function isAnExample(packageId) {
  return EXAMPLES_PACKAGES.includes(packageId);
}

function isNotAnExample(packageId) {
  return !isAnExample(packageId);
}

function isTargetedPackage(packageId) {
  if (TARGETED_PACKAGE_ID) {
    return packageId === TARGETED_PACKAGE_ID;
  }

  return true;
}

function getCompanyPackageFile(packageId) {
  const packageFilePath = join(
    __dirname,
    `../packages/${packageId}/package.json`
  );
  return require(packageFilePath);
}

function getWorkspaceDependenciesMap() {
  /**
   * @type {{[id: string]: { id: string; dependencies: string[]; source: any }}}
   */
  const workspaceDependenciesMap = {};

  const nxGraphResult = spawnSync(
    'npx',
    ['nx', 'graph', '--file', NX_GRAPH_FILE_PATH],
    { stdio: 'inherit' }
  );
  if (nxGraphResult.status !== 0) {
    throw new Error(`"nx graph" failed with status ${nxGraphResult.status}`);
  }
  const nxGraph = require(NX_GRAPH_FILE_PATH);

  const packageIds = Object.entries(nxGraph.graph.dependencies)
    .map(([packageId]) => packageId)
    .filter((packageId) => packageId !== 'stacks');

  for (const packageId of packageIds.filter(isNotAnExample)) {
    console.log(`Scanning dependencies for package ${packageId}...`);
    const packageFileContent = getCompanyPackageFile(packageId);
    const dependencies = packageFileContent.dependencies
      ? Object.entries(packageFileContent.dependencies).map(
          ([dependency]) => dependency
        )
      : [];

    workspaceDependenciesMap[packageId] = {
      id: packageId,
      dependencies: [],
      source: packageFileContent,
    };
    if (packageFileContent.dependencies) {
      for (const dependency of dependencies) {
        workspaceDependenciesMap[packageId].dependencies.push(dependency);
      }
    }
  }

  console.log('Dependencies scan done.');

  return workspaceDependenciesMap;
}

async function main() {
  const workspaceDependenciesMap = getWorkspaceDependenciesMap();

  for (const { id, dependencies, source } of Object.values(
    workspaceDependenciesMap
  ).filter(({ id }) => isTargetedPackage(id))) {
    console.log(`package.json file updating for project "${id}"...`);

    const packagePath = join(__dirname, `../dist/packages/${id}`);
    await mkdir(packagePath, { recursive: true });
    const packageFilePath = join(packagePath, 'package.json');

    const packageFileContent = { ...source };

    if (dependencies.length && !packageFileContent.dependencies) {
      packageFileContent.dependencies = [];
    }

    dependencies.forEach((dependency) => {
      const versionTag = isACompanyPackage(dependency)
        ? `^${
            workspaceDependenciesMap[
              dependency.replace(COMPANY_PACKAGE_PREFIX, '')
            ].source.version
          }`
        : ROOT_PACKAGE_CONTENT.devDependencies[dependency];
      packageFileContent.dependencies[dependency] = versionTag;
    });

    writeFileSync(
      packageFilePath,
      JSON.stringify(packageFileContent, null, 2) + '\n'
    );

    console.log(`package.json file updated for project "${id}"`);
  }

  console.log('Package files updated.');
}

main();
