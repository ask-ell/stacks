import { ProjectVisibilityDTO } from "./project-visibility.dto";

export type CreateProjectDTO = {
    path: string;
    namespace_id: number;
    visibility: ProjectVisibilityDTO,
    initialize_with_readme: boolean
}