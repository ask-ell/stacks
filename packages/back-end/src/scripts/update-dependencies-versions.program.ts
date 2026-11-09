import {
  MaybeUndefined,
  StringDictionnary,
  UnknownEnvironmentVariableError,
} from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';
import { ProgramExecutionOptions, Program } from '@ask-ell/node';
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

function makeSureThatProjectRootPathIsDefined(
  projectRootPath: MaybeUndefined<string>
): asserts projectRootPath is string {
  if (!projectRootPath) {
    throw new UnknownEnvironmentVariableError('PWD');
  }
}

function getOrganisationPackageFile(
  projectRootPath: string,
  packageId: string
): PackageContent {
  const packageFilePath = join(
    projectRootPath,
    `packages/${packageId}/package.json`
  );
  return require(packageFilePath);
}

export type PackageContent = {
  version: string;
  dependencies: StringDictionnary;
  devDependencies: StringDictionnary;
};

export type UpdateDependenciesVersionsProgramParams = {
  organisationPackagePrefix: string;
  blackListedPackages: string[];
};

export type WorkspaceDependenciesMapElement = {
  id: string;
  dependencies: string[];
  source: PackageContent;
};

export type WorkspaceDependenciesMap = {
  [id: string]: WorkspaceDependenciesMapElement;
};

export class UpdateDependenciesVersionsProgram extends Program {
  private organisationPackagePrefix: string;
  private blackListedPackages: string[];

  constructor({
    organisationPackagePrefix,
    blackListedPackages,
  }: UpdateDependenciesVersionsProgramParams) {
    super({
      logger: NestLogger.fromClass(UpdateDependenciesVersionsProgram),
      arguments: [
        {
          name: 'targetedPackage',
          description: 'Target package',
        },
      ],
    });
    this.organisationPackagePrefix = organisationPackagePrefix;
    this.blackListedPackages = blackListedPackages;
  }

  async execute({
    logger,
    arguments: { targetedPackage },
  }: ProgramExecutionOptions): Promise<void> {
    const projectRootPath: MaybeUndefined<string> = process.env['PWD'];
    makeSureThatProjectRootPathIsDefined(projectRootPath);

    const rootPackageContent: PackageContent = require(join(
      projectRootPath,
      'package.json'
    ));
    const workspaceDependenciesMap: WorkspaceDependenciesMap =
      this.getWorkspaceDependenciesMap(projectRootPath);

    const workspaceDependenciesMapElements: WorkspaceDependenciesMapElement[] =
      Object.values(workspaceDependenciesMap).filter(
        ({ id }: WorkspaceDependenciesMapElement): boolean =>
          this.isTargetedPackage(targetedPackage)(id)
      );

    for (const {
      id,
      dependencies,
      source,
    } of workspaceDependenciesMapElements) {
      logger.log(`package.json file updating for project "${id}"...`);

      const packagePath: string = join(projectRootPath, `dist/packages/${id}`);

      await mkdir(packagePath, { recursive: true });
      const packageFilePath: string = join(packagePath, 'package.json');

      const packageFileContent: PackageContent = { ...source };

      if (dependencies.length && !packageFileContent.dependencies) {
        packageFileContent.dependencies = {};
      }

      dependencies.forEach((dependency: string): void => {
        const versionTag = this.isAOrganisationPackage(dependency)
          ? `^${
              workspaceDependenciesMap[
                dependency.replace(this.organisationPackagePrefix, '')
              ].source.version
            }`
          : rootPackageContent.devDependencies[dependency];
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

  getWorkspaceDependenciesMap(
    projectRootPath: string
  ): WorkspaceDependenciesMap {
    const workspaceDependenciesMap: WorkspaceDependenciesMap = {};
    const nxGraphFilePath: string = join(projectRootPath, 'tmp/graph.json');

    const nxGraphResult = spawnSync(
      'npx',
      ['nx', 'graph', '--file', nxGraphFilePath],
      { stdio: 'inherit' }
    );
    if (nxGraphResult.status !== 0) {
      throw new Error(`"nx graph" failed with status ${nxGraphResult.status}`);
    }
    const nxGraph = require(nxGraphFilePath);

    const packageIds = Object.entries(nxGraph.graph.dependencies).map(
      ([packageId]) => packageId
    );

    for (const packageId of packageIds.filter((packageId: string): boolean =>
      this.isNotBlackListed(packageId)
    )) {
      console.log(`Scanning dependencies for package ${packageId}...`);
      const packageFileContent = getOrganisationPackageFile(
        projectRootPath,
        packageId
      );
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

  private isTargetedPackage =
    (targetPackageId: MaybeUndefined<string>) => (packageId: string) => {
      if (targetPackageId) {
        return packageId === targetPackageId;
      }
      return true;
    };

  private isAOrganisationPackage(packageName: string): boolean {
    return packageName.includes(this.organisationPackagePrefix);
  }

  private isBlackListed(packageId: string): boolean {
    return this.blackListedPackages.includes(packageId);
  }

  private isNotBlackListed(packageId: string): boolean {
    return !this.isBlackListed(packageId);
  }
}
