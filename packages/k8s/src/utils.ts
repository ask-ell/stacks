import { MaybeUndefined } from "@ask-ell/core";
import { V1CustomResourceDefinitionVersion } from "@kubernetes/client-node";

import { ComponentsFetchingResponse } from "./types";


export async function getItems<T>(itemsFactory: Promise<ComponentsFetchingResponse<T>>): Promise<T[]> {
    const { items } = await itemsFactory;
    return items;
}

export function getVersionName(version: V1CustomResourceDefinitionVersion): string {
    const versionName: MaybeUndefined<string> = version?.name;
    if(!versionName){
        throw new Error('No version specified');
    }
    return versionName;
}
