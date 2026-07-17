const fs = require('fs');

const workspaceDependenciesMap = {
  'sentry': ['core'],
  'react': ['sentry', 'core'],
  'keyv': ['core'],
  'k8s': ['core'],
  'gitlab': ['core'],
  'github': ['core'],
  'ask': ['core'],
  'nest': ['sentry', 'core'],
  'node': ['core'],
  'back-end': ['nest', 'ask', 'node', 'core'],
};

function getVersionTag(dependencyName) {
  if (dependencyName === 'core') {
    return '^1.3.1';
  }

  const dependencyPackage = require(`../dist/packages/${dependencyName}/package.json`);
  return `^${dependencyPackage.version}`;
}

function main() {
  for (const [packageName, dependencies] of Object.entries(workspaceDependenciesMap)) {
    const rootPackagePath = `./dist/packages/${packageName}/package.json`;
    const rootPackage = JSON.parse(
      fs.readFileSync(rootPackagePath, 'utf8')
    );

    dependencies.forEach((dependencyName) => {
      rootPackage.dependencies ??= {};
      rootPackage.dependencies[`@ask-ell/${dependencyName}`] = getVersionTag(dependencyName);
    });

    fs.writeFileSync(
      rootPackagePath,
      JSON.stringify(rootPackage, null, 2) + '\n'
    );
  }
}

main();