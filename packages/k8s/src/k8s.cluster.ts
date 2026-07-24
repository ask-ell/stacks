import { ILogger } from "@ask-ell/core";
import { ApiextensionsV1Api, AppsV1Api, CoreV1Api, CustomObjectsApi, KubeConfig, RbacAuthorizationV1Api } from "@kubernetes/client-node";

import { K8SClusterParams, PersistClusterCustomObjectDTO, K8SSecret, K8SService, K8SCustomResource, DeleteClusterCustomObjectDTO, K8SCustomResourceDefinition, K8SNamespace, CreateDeploymentDTO, CreateServiceDTO, DeleteComponentDTO, K8SDeployment, K8SServiceAccount, CreateServiceAccountDTO, CreateServiceAccountTokenDTO, GetRolesDTO, K8SRole, CreateRoleDTO, K8SRoleBinding, GetRoleBindingsDTO, CreateRoleBindingDTO } from "./types";
import { getK8SConfig } from "./k8s.config";
import { IK8SCluster } from "./k8s.cluster.interface";
import { getItems, getVersionName } from "./utils";
import { MERGE_PATCH_MIDDLEWARE } from "./middlewares/merge-patch.middleware";


export class K8SCluster implements IK8SCluster {
    private logger: ILogger;
    private coreV1Api: CoreV1Api;
    private appsV1Api: AppsV1Api;
    private customObjectsApi: CustomObjectsApi;
    private apiextensionsV1Api: ApiextensionsV1Api;
    private rbacAuthorizationV1Api: RbacAuthorizationV1Api;

    constructor({
        configFilePath,
        logger
    }: K8SClusterParams) {
        this.logger = logger;
        const config: KubeConfig = getK8SConfig(configFilePath);
        this.coreV1Api = config.makeApiClient(CoreV1Api);
        this.appsV1Api = config.makeApiClient(AppsV1Api);
        this.customObjectsApi = config.makeApiClient(CustomObjectsApi);
        this.apiextensionsV1Api = config.makeApiClient(ApiextensionsV1Api);
        this.rbacAuthorizationV1Api = config.makeApiClient(RbacAuthorizationV1Api);
    }

    getAllNamespaces(): Promise<K8SNamespace[]> {
        return getItems(this.coreV1Api.listNamespace());
    }

    async isNamespacePersisted(name: string): Promise<boolean> {
        const allNamespaces: K8SNamespace[] = await this.getAllNamespaces();
        return allNamespaces.some((namespace: K8SNamespace): boolean => namespace.metadata?.name === name);
    }

    async createNamespace(name: string): Promise<void> {
        await this.coreV1Api.createNamespace({
            body: {
                apiVersion: 'v1',
                kind: 'Namespace',
                metadata: {
                    name
                }
            }
        });
    }

    async deleteNamespace(namespace: string): Promise<void> {
        await this.coreV1Api.deleteNamespace({ name: namespace });
    }

    getDeploymentsFromNamespace(namespace: string): Promise<K8SDeployment[]> {
        return getItems(this.appsV1Api.listNamespacedDeployment({ namespace }));
    }

    async createDeployment({ namespace, dto }: CreateDeploymentDTO): Promise<void> {
        await this.appsV1Api.createNamespacedDeployment({ namespace, body: dto });
    }

    async deleteDeployment({ name, namespace }: DeleteComponentDTO): Promise<void> {
        await this.appsV1Api.deleteNamespacedDeployment({ name, namespace })
    }

    getServicesFromNamespace(namespace: string): Promise<K8SService[]> {
        return getItems(this.coreV1Api.listNamespacedService({ namespace }));
    }

    async getServiceAccountsFromNamespace(namespace: string): Promise<K8SServiceAccount[]> {
        return getItems(this.coreV1Api.listNamespacedServiceAccount({ namespace }));
    }

    async createServiceAccount({ name, namespace }: CreateServiceAccountDTO): Promise<void> {
        await this.coreV1Api.createNamespacedServiceAccount({
            namespace,
            body: {
                apiVersion: 'v1',
                kind: 'ServiceAccount',
                metadata: {
                    name,
                    namespace
                }
            }
        });
    }

    async createServiceAccountToken({ namespace, name }: CreateServiceAccountTokenDTO): Promise<void> {
        await this.coreV1Api.createNamespacedSecret({
            namespace,
            body: {
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    annotations: {
                        'kubernetes.io/service-account.name': namespace
                    },
                    name,
                    namespace
                },
                type: 'kubernetes.io/service-account-token'
            }
        });
    }

    async createService({ namespace, dto }: CreateServiceDTO): Promise<void> {
        await this.coreV1Api.createNamespacedService({ namespace, body: dto });
    }

    async deleteService({ name, namespace }: DeleteComponentDTO): Promise<void> {
        await this.coreV1Api.deleteNamespacedService({ name, namespace });
    }

    getSecretsFromNamespace(namespace: string): Promise<K8SSecret[]> {
        return getItems(this.coreV1Api.listNamespacedSecret({ namespace }));
    }

    async getRoles({ namespace }: GetRolesDTO): Promise<K8SRole[]> {
        return getItems(this.rbacAuthorizationV1Api.listNamespacedRole({ namespace }));
    }

    async createRole({ metadata: { name, namespace }, rules }: CreateRoleDTO): Promise<void> {
        await this.rbacAuthorizationV1Api.createNamespacedRole({
            namespace,
            body: {
                apiVersion: 'rbac.authorization.k8s.io/v1',
                kind: 'Role',
                metadata: {
                    name,
                    namespace
                },
                rules
            }
        });
    }

    async getRoleBindings({ namespace }: GetRoleBindingsDTO): Promise<K8SRoleBinding[]> {
        return getItems(this.rbacAuthorizationV1Api.listNamespacedRoleBinding({ namespace }));
    }

    async createRoleBinding({ name, namespace, subjects }: CreateRoleBindingDTO): Promise<void> {
        await this.rbacAuthorizationV1Api.createNamespacedRoleBinding({
            namespace,
            body: {
                apiVersion: 'rbac.authorization.k8s.io/v1',
                kind: 'RoleBinding',
                metadata: {
                    name,
                    namespace
                },
                roleRef: {
                    apiGroup: 'rbac.authorization.k8s.io',
                    kind: 'Role',
                    name
                },
                subjects
            }
        });
    }

    async getAllCustomResourceDefinitions(): Promise<K8SCustomResourceDefinition[]> {
        return getItems(this.apiextensionsV1Api.listCustomResourceDefinition());
    }

    async createCustomResourceDefinition(body: K8SCustomResourceDefinition): Promise<void> {
        await this.apiextensionsV1Api.createCustomResourceDefinition({ body }).catch(this.logger.error);
    }

    async getAllClusterCustomObjectsFromResourceDefinition<CustomResource extends K8SCustomResource>({
        spec: { group, names: { plural }, versions }
    }: K8SCustomResourceDefinition): Promise<CustomResource[]> {
        const versionName: string = getVersionName(versions[0]);
        const result: any = await this.customObjectsApi.listClusterCustomObject({
            group,
            plural,
            version: versionName,
        });
        return result['items'];
    }

    async createClusterCustomObject<CustomResource extends K8SCustomResource>({
        resourceDefinition: {
            spec: {
                group,
                versions,
                names: {
                    plural,
                    kind
                }
            }
        },
        metadata,
        spec
    }: PersistClusterCustomObjectDTO<CustomResource>): Promise<void> {
        const versionName: string = getVersionName(versions[0]);
        const apiVersion = `${group}/${versionName}`;

        await this.customObjectsApi.createClusterCustomObject({
            group,
            plural,
            version: versionName,
            body: {
                apiVersion,
                kind,
                metadata,
                spec
            }
        });
    }

    async patchClusterCustomObject<CustomResource extends K8SCustomResource>({
        resourceDefinition: {
            spec: {
                group,
                versions,
                names: {
                    plural,
                    kind
                }
            }
        },
        metadata,
        spec
    }: PersistClusterCustomObjectDTO<CustomResource>): Promise<void> {
        const versionName: string = getVersionName(versions[0]);
        const apiVersion = `${group}/${versionName}`;

        await this.customObjectsApi.patchClusterCustomObject({
            name: metadata.name,
            group,
            plural,
            version: versionName,
            body: {
                apiVersion,
                kind,
                metadata,
                spec
            }
        }, {
            middleware: [MERGE_PATCH_MIDDLEWARE],
            middlewareMergeStrategy: 'append'
        });
    }

    async deleteClusterCustomObject<CustomResource extends K8SCustomResource>({ resourceDefinition, metadata }: DeleteClusterCustomObjectDTO<CustomResource>): Promise<void> {
        await this.customObjectsApi.deleteClusterCustomObject({
            group: resourceDefinition.spec.group,
            version: resourceDefinition.spec.versions[0].name,
            plural: resourceDefinition.spec.names.plural,
            name: metadata.name
        });
    }
}