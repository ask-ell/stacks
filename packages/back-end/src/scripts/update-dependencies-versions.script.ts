import { MaybeUndefined, StringDictionnary, UnknownEnvironmentVariableError } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";
import { ExecuteOptions, Script } from "@ask-ell/node";
import { spawnSync } from 'node:child_process';
import { writeFileSync } from "node:fs";
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';


const PROJECT_ROOT_PATH: MaybeUndefined<string> = process.env['PWD'];

function makeSureThatProjectRootPathIsDefined(projectRootPath: MaybeUndefined<string>): asserts projectRootPath is string {
    if (!projectRootPath) {
        throw new UnknownEnvironmentVariableError('PWD');
    }
}

makeSureThatProjectRootPathIsDefined(PROJECT_ROOT_PATH);

const NX_GRAPH_FILE_PATH: string = join(PROJECT_ROOT_PATH, 'tmp/graph.json');

type PackageContent = {
    version: string;
    dependencies: StringDictionnary;
    devDependencies: StringDictionnary;
};

const ROOT_PACKAGE_FILE_PATH: string = join(PROJECT_ROOT_PATH, `package.json`);
const ROOT_PACKAGE_CONTENT: PackageContent = require(ROOT_PACKAGE_FILE_PATH);


function getOrganisationPackageFile(packageId: string): PackageContent {
    makeSureThatProjectRootPathIsDefined(PROJECT_ROOT_PATH);
    const packageFilePath = join(PROJECT_ROOT_PATH, `packages/${packageId}/package.json`);
    return require(packageFilePath);
}

type UpdateDependenciesVersionsScriptParams = {
    organisationPackagePrefix: string;
    blackListedPackages: string[];
}

type WorkspaceDependenciesMapElement = { id: string; dependencies: string[]; source: PackageContent };

type WorkspaceDependenciesMap = {
    [id: string]: WorkspaceDependenciesMapElement;
};

export class UpdateDependenciesVersionsScript extends Script {
    private organisationPackagePrefix: string;
    private blackListedPackages: string[];
    private workspaceDependenciesMap: WorkspaceDependenciesMap = this.getWorkspaceDependenciesMap();

    constructor({
        organisationPackagePrefix,
        blackListedPackages
    }: UpdateDependenciesVersionsScriptParams) {
        super({
            logger: NestLogger.fromClass(UpdateDependenciesVersionsScript),
            arguments: [
                {
                    name: 'targetedPackage',
                    description: "Target package"
                }
            ]
        });
        this.organisationPackagePrefix = organisationPackagePrefix;
        this.blackListedPackages = blackListedPackages;
    }

    async execute({
        logger,
        arguments: {
            targetedPackage
        }
    }: ExecuteOptions): Promise<void> {
        const workspaceDependenciesMapElements: WorkspaceDependenciesMapElement[] = Object
                .values(this.workspaceDependenciesMap)
                .filter(({ id }: WorkspaceDependenciesMapElement): boolean => this.isTargetedPackage(targetedPackage)(id));

        for (const { id, dependencies, source } of workspaceDependenciesMapElements) {
            logger.log(`package.json file updating for project "${id}"...`);

            if (!PROJECT_ROOT_PATH) {
                throw new UnknownEnvironmentVariableError('PWD');
            }
            const packagePath: string = join(PROJECT_ROOT_PATH, `dist/packages/${id}`);

            await mkdir(packagePath, { recursive: true });
            const packageFilePath: string = join(PROJECT_ROOT_PATH, 'package.json');

            const packageFileContent: PackageContent = { ...source };

            if (dependencies.length && !packageFileContent.dependencies) {
                packageFileContent.dependencies = {};
            }

            dependencies.forEach((dependency: string): void => {
                const versionTag = this.isAOrganisationPackage(dependency)
                    ? `^${this.workspaceDependenciesMap[dependency.replace(this.organisationPackagePrefix, '')].source.version}`
                    : ROOT_PACKAGE_CONTENT.devDependencies[dependency];
                packageFileContent.dependencies[dependency] = versionTag;
            });

            writeFileSync(
                packageFilePath,
                JSON.stringify(packageFileContent, null, 2) + '\n'
            );

            console.log(`package.json file updated for project "${id}"`);
        }

        console.log('Package files updated.')
    }

    getWorkspaceDependenciesMap(): WorkspaceDependenciesMap {
        const workspaceDependenciesMap: WorkspaceDependenciesMap = {};

        const nxGraphResult = spawnSync('npx', ['nx', 'graph', '--file', NX_GRAPH_FILE_PATH], { stdio: 'inherit' });
        if (nxGraphResult.status !== 0) {
            throw new Error(`"nx graph" failed with status ${nxGraphResult.status}`);
        }
        const nxGraph = require(NX_GRAPH_FILE_PATH);

        const packageIds = Object.entries(nxGraph.graph.dependencies).map(([packageId]) => packageId);

        for (const packageId of packageIds.filter(this.isNotBlackListed)) {
            console.log(`Scanning dependencies for package ${packageId}...`)
            const packageFileContent = getOrganisationPackageFile(packageId);
            const dependencies = packageFileContent.dependencies ? Object.entries(packageFileContent.dependencies).map(([dependency]) => dependency) : [];

            workspaceDependenciesMap[packageId] = {
                id: packageId,
                dependencies: [],
                source: packageFileContent
            }
            if (packageFileContent.dependencies) {
                for (const dependency of dependencies) {
                    workspaceDependenciesMap[packageId].dependencies.push(dependency);
                }
            }
        }

        console.log('Dependencies scan done.');

        return workspaceDependenciesMap;
    }

    private isTargetedPackage = (targetPackageId: MaybeUndefined<string>) => (packageId: string) => {
        if (targetPackageId) {
            return packageId === targetPackageId;
        }
        return true;
    }

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