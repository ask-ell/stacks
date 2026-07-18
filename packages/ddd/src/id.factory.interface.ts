import { Id } from "./types";


export interface IIdFactory<DTO = unknown> {
    create(dto?: DTO): Promise<Id>;
}
