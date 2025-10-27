import { AuthMethod } from "./types";

export interface ISwaggerAddOnState {
  title: string;
  auths?: AuthMethod[];
}