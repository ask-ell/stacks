import { ILogger } from "@ask-ell/core";
import { ApiextensionsV1Api, AppsV1Api, CoreV1Api, CustomObjectsApi, KubeConfig, RbacAuthorizationV1Api } from "@kubernetes/client-node";

import { K8SClusterParams, PersistClusterCustomObjectDTO, K8SSecret, K8SService, K8SCustomResource, DeleteClusterCustomObjectDTO, K8SCustomResourceDefinition, K8SNamespace, CreateDeploymentDTO, CreateServiceDTO, DeleteComponentDTO, K8SDeployment, K8SServiceAccount, CreateServiceAccountDTO, CreateServiceAccountTokenDTO, GetRolesDTO, K8SRole, CreateRoleDTO, K8SRoleBinding, GetRoleBindingsDTO, CreateRoleBindingDTO } from "./types";
import { getK8SConfig } from "./k8s.config";
import { IK8SCluster } from "./k8s.cluster.interface";
import { getItems } from "./utils";


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
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: {
                name
            }
        });
    }

    async deleteNamespace(namespace: string): Promise<void> {
        await this.coreV1Api.deleteNamespace(namespace);
    }

    getDeploymentsFromNamespace(namespace: string): Promise<K8SDeployment[]> {
        return getItems(this.appsV1Api.listNamespacedDeployment(namespace));
    }

    async createDeployment({ namespace, dto }: CreateDeploymentDTO): Promise<void> {
        await this.appsV1Api.createNamespacedDeployment(namespace, dto);
    }

    async deleteDeployment({ name, namespace }: DeleteComponentDTO): Promise<void> {
        await this.appsV1Api.deleteNamespacedDeployment(name, namespace)
    }

    getServicesFromNamespace(namespace: string): Promise<K8SService[]> {
        return getItems(this.coreV1Api.listNamespacedService(namespace));
    }

    async getServiceAccountsFromNamespace(namespace: string): Promise<K8SServiceAccount[]> {
        return getItems(this.coreV1Api.listNamespacedServiceAccount(namespace));
    }

    async createServiceAccount({ name, namespace }: CreateServiceAccountDTO): Promise<void> {
        await this.coreV1Api.createNamespacedServiceAccount(
            namespace,
            {
                apiVersion: 'v1',
                kind: 'ServiceAccount',
                metadata: {
                    name,
                    namespace
                }
            }
        );
    }

    async createServiceAccountToken({ namespace, name }: CreateServiceAccountTokenDTO): Promise<void> {
        await this.coreV1Api.createNamespacedSecret(
            namespace,
            {
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
        );
    }

    async createService({ namespace, dto }: CreateServiceDTO): Promise<void> {
        await this.coreV1Api.createNamespacedService(namespace, dto);
    }

    async deleteService({ name, namespace }: DeleteComponentDTO): Promise<void> {
        await this.coreV1Api.deleteNamespacedService(name, namespace);
    }

    getSecretsFromNamespace(namespace: string): Promise<K8SSecret[]> {
        return getItems(this.coreV1Api.listNamespacedSecret(namespace));
    }

    async getRoles({ name, namespace }: GetRolesDTO): Promise<K8SRole[]> {
        return getItems(this.rbacAuthorizationV1Api.listNamespacedRole(
            name,
            namespace
        ));
    }

    async createRole({ metadata: { name, namespace }, rules }: CreateRoleDTO): Promise<void> {
        await this.rbacAuthorizationV1Api.createNamespacedRole(
            namespace,
            {
                apiVersion: 'rbac.authorization.k8s.io/v1',
                kind: 'Role',
                metadata: {
                    name,
                    namespace
                },
                rules
            }
        );
    }

    async getRoleBindings({ name, namespace }: GetRoleBindingsDTO): Promise<K8SRoleBinding[]> {
        return getItems(
            this.rbacAuthorizationV1Api.listNamespacedRoleBinding(
                name,
                namespace,
            )
        );
    }

    async createRoleBinding({ name, namespace, subjects }: CreateRoleBindingDTO): Promise<void> {
        await this.rbacAuthorizationV1Api.createNamespacedRoleBinding(
            namespace,
            {
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
        );
    }

    async getAllCustomResourceDefinitions(): Promise<K8SCustomResourceDefinition[]> {
        return getItems(this.apiextensionsV1Api.listCustomResourceDefinition());
    }

    async createCustomResourceDefinition(dto: K8SCustomResourceDefinition): Promise<void> {
        await this.apiextensionsV1Api.createCustomResourceDefinition(dto).catch(this.logger.error);
    }

    async getAllClusterCustomObjectsFromResourceDefinition<CustomResource extends K8SCustomResource>(dto: K8SCustomResourceDefinition): Promise<CustomResource[]> {
        const { body } = await this.customObjectsApi.listClusterCustomObject(
            dto.spec.group,
            dto.spec.versions[0].name,
            dto.spec.names.plural
        );
        return (body as any)['items'];
    }

    async createClusterCustomObject<CustomResource extends K8SCustomResource>({ resourceDefinition, metadata, spec }: PersistClusterCustomObjectDTO<CustomResource>): Promise<void> {
        await this.customObjectsApi.createClusterCustomObject(
            resourceDefinition.spec.group,
            resourceDefinition.spec.versions[0].name,
            resourceDefinition.spec.names.plural,
            {
                apiVersion: `${resourceDefinition.spec.group}/${resourceDefinition.spec.versions[0].name}`,
                kind: resourceDefinition.spec.names.kind,
                metadata,
                spec
            }
        );
    }

    async patchClusterCustomObject<CustomResource extends K8SCustomResource>({ resourceDefinition, metadata, spec }: PersistClusterCustomObjectDTO<CustomResource>): Promise<void> {
        await this.customObjectsApi.patchClusterCustomObject(
            resourceDefinition.spec.group,
            resourceDefinition.spec.versions[0].name,
            resourceDefinition.spec.names.plural,
            metadata.name,
            {
                apiVersion: `${resourceDefinition.spec.group}/${resourceDefinition.spec.versions[0].name}`,
                kind: resourceDefinition.spec.names.kind,
                metadata,
                spec
            },
            undefined,
            undefined,
            undefined,
            {
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                }
            }
        );
    }

    async deleteClusterCustomObject<CustomResource extends K8SCustomResource>({ resourceDefinition, metadata }: DeleteClusterCustomObjectDTO<CustomResource>): Promise<void> {
        await this.customObjectsApi.deleteClusterCustomObject(
            resourceDefinition.spec.group,
            resourceDefinition.spec.versions[0].name,
            resourceDefinition.spec.names.plural,
            metadata.name
        );
    }
}