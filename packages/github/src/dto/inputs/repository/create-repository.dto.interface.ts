export interface ICreateRepositoryDTO {
    organisationId: string;
    name: string;
    description: string;
    archived: boolean;
    private: boolean;
}
