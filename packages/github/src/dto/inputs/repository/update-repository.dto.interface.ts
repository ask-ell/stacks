export interface IUpdateRepositoryDTO {
  organisationId: string;
  repositoryId: string;
  name: string;
  description: string;
  archived: boolean;
  private: boolean;
}
