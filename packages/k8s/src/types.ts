import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { RbacV1Subject, V1CustomResourceDefinition, V1Deployment, V1Namespace, V1PolicyRule, V1Role, V1RoleBinding, V1Secret, V1Service, V1ServiceAccount, V1ServicePort } from "@kubernetes/client-node";

export type K8SClusterParams = {
    configFilePath: MaybeUndefined<string>;
    logger: ILogger;
};

export type ComponentsFetchingResponse<Item> = {
    items: Item[];
};

type CreateComponentDTOWrapper<DTO> = {
    namespace: string;
    dto: DTO;
};

export type DeleteComponentDTO = {
    namespace: string;
    name: string;
};

export type K8SNamespace = V1Namespace;

export type K8SDeployment = V1Deployment;

export type CreateDeploymentDTO = CreateComponentDTOWrapper<K8SDeployment>;

export type K8SService = V1Service;

export type CreateServiceDTO = CreateComponentDTOWrapper<K8SService>;

export type K8SServicePort = V1ServicePort;

export type K8SServiceAccount = V1ServiceAccount;

export type CreateServiceAccountDTO = {
    name: string;
    namespace: string;
};

export type CreateServiceAccountTokenDTO = {
    name: string;
    namespace: string;
};

export type K8SSecret = V1Secret;

export type K8SRole = V1Role;

export type GetRolesDTO = {
    name: string;
    namespace: string;
};

export type CreateRoleDTO = {
    metadata: {
        name: string;
        namespace: string;
    };
    rules: V1PolicyRule[];
};

export type K8SRoleBinding = V1RoleBinding;

export type GetRoleBindingsDTO = {
    name: string;
    namespace: string;
};

export type CreateRoleBindingDTO = {
    name: string;
    namespace: string;
    subjects: RbacV1Subject[];
}

export type K8SCustomResourceDefinition = V1CustomResourceDefinition;

export type K8SCustomResource<Spec = unknown> = {
    apiVersion: string;
    kind: string;
    metadata: {
        name: string;
    },
    spec: Spec;
};

export type PersistClusterCustomObjectDTO<CustomResource extends K8SCustomResource> = {
    resourceDefinition: K8SCustomResourceDefinition;
    metadata: CustomResource['metadata'];
    spec: CustomResource['spec'];
};

export type DeleteClusterCustomObjectDTO<CustomResource extends K8SCustomResource> = Omit<PersistClusterCustomObjectDTO<CustomResource>, 'spec'>;