import { ComponentsFetchingResponse } from "./types";

export async function getItems<T>(itemsFactory: Promise<ComponentsFetchingResponse<T>>): Promise<T[]> {
    const { body: { items } } = await itemsFactory;
    return items;
}