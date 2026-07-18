import { Id } from "./types";


export interface IdFactory<DTO> {
    create(dto: DTO): Promise<Id>;
}
