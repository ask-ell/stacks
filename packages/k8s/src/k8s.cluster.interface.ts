import { PersistClusterCustomObjectDTO, K8SSecret, K8SService, K8SCustomResource, DeleteClusterCustomObjectDTO, K8SCustomResourceDefinition, K8SNamespace, CreateDeploymentDTO, CreateServiceDTO, DeleteComponentDTO, K8SDeployment, K8SServiceAccount, CreateServiceAccountDTO, CreateServiceAccountTokenDTO, GetRolesDTO, K8SRole, CreateRoleDTO, K8SRoleBinding, GetRoleBindingsDTO, CreateRoleBindingDTO } from "./types";

export interface IK8SCluster {
    getAllNamespaces(): Promise<K8SNamespace[]>;
    isNamespacePersisted(name: string): Promise<boolean>;
    createNamespace(name: string): Promise<void>;
    deleteNamespace(namespace: string): Promise<void>;
    getDeploymentsFromNamespace(namespace: string): Promise<K8SDeployment[]>;
    createDeployment(dto: CreateDeploymentDTO): Promise<void>;
    deleteDeployment(dto: DeleteComponentDTO): Promise<void>;
    getServicesFromNamespace(namespace: string): Promise<K8SService[]>;
    createService(dto: CreateServiceDTO): Promise<void>;
    deleteService(dto: DeleteComponentDTO): Promise<void>;
    getServiceAccountsFromNamespace(namespace: string): Promise<K8SServiceAccount[]>;
    createServiceAccount(dto: CreateServiceAccountDTO): Promise<void>;
    createServiceAccountToken(dto: CreateServiceAccountTokenDTO): Promise<void>;
    getSecretsFromNamespace(namespace: string): Promise<K8SSecret[]>;
    getRoles(dto: GetRolesDTO): Promise<K8SRole[]>;
    createRole(dto: CreateRoleDTO): Promise<void>;
    getRoleBindings(dto: GetRoleBindingsDTO): Promise<K8SRoleBinding[]>;
    createRoleBinding(dto: CreateRoleBindingDTO): Promise<void>;
    getAllCustomResourceDefinitions(): Promise<K8SCustomResourceDefinition[]>;
    createCustomResourceDefinition(dto: K8SCustomResourceDefinition): Promise<void>;
    getAllClusterCustomObjectsFromResourceDefinition<CustomResource extends K8SCustomResource>(dto: K8SCustomResourceDefinition): Promise<CustomResource[]>;
    createClusterCustomObject<CustomResource extends K8SCustomResource>(dto: PersistClusterCustomObjectDTO<CustomResource>): Promise<void>;
    patchClusterCustomObject<CustomResource extends K8SCustomResource>(dto: PersistClusterCustomObjectDTO<CustomResource>): Promise<void>;
    deleteClusterCustomObject<CustomResource extends K8SCustomResource>(dto: DeleteClusterCustomObjectDTO<CustomResource>): Promise<void>;
}