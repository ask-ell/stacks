const { spawnSync } = require('node:child_process');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const fs = require('node:fs');


const EXAMPLES_FOLDER = join(__dirname, '../examples');
const EXAMPLES_PROJECTS = readdirSync(EXAMPLES_FOLDER);

const NX_GRAPH_FILE_PATH = join(__dirname, '../tmp/graph.json');

function getVersionTag(dependencyName) {
  const dependencyPackageJsonFilePath = join(__dirname, `../dist/packages/${dependencyName}/package.json`);
  const dependencyPackage = require(dependencyPackageJsonFilePath);
  return `^${dependencyPackage.version}`;
}

function discriminateExamples([packageName, dependenciesMaps]) {
  return !EXAMPLES_PROJECTS.includes(packageName);
}

function main() {
  const workspaceDependenciesMap = {};

  spawnSync('nx', ['graph', '--file', NX_GRAPH_FILE_PATH], { stdio: 'inherit' });
  const nxGraph = require(NX_GRAPH_FILE_PATH);

  for(const [packageName, dependenciesMaps] of Object.entries(nxGraph.graph.dependencies).filter(discriminateExamples)) {
    console.log(`Scanning dependencies for package ${packageName}...`)
    for(const dependencyMap of dependenciesMaps){
      if(!workspaceDependenciesMap[packageName]){
        workspaceDependenciesMap[packageName] = []
      }
      workspaceDependenciesMap[packageName].push(dependencyMap.target);
    }
  }
  console.log('Dependencies scan done.');

  for (const [packageName, dependencies] of Object.entries(workspaceDependenciesMap)) {
    console.log(`package.json file update for project "${packageName}"...`);
    const rootPackageJsonFilePath = join(__dirname, `../dist/packages/${packageName}/package.json`);

    const rootPackage = JSON.parse(
      fs.readFileSync(rootPackageJsonFilePath, 'utf8')
    );

    dependencies.forEach((dependencyName) => {
      rootPackage.dependencies ??= {};
      rootPackage.dependencies[`@ask-ell/${dependencyName}`] = getVersionTag(dependencyName);
    });

    fs.writeFileSync(
      rootPackageJsonFilePath,
      JSON.stringify(rootPackage, null, 2) + '\n'
    );
  }

  console.log('package.json files updated.')
}

main();