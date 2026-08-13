import { IResult } from '../primitives';
import type {
  DeleteMethodParams,
  GetMethodParams,
  PatchMethodParams,
  PostMethodParams,
  PutMethodParams,
} from './types';

export interface IHttpClient {
  get<ResponseData>({
    url,
    headers,
  }: GetMethodParams): Promise<IResult<ResponseData>>;
  post<Body, ResponseData>({
    url,
    headers,
    body,
  }: PostMethodParams<Body>): Promise<IResult<ResponseData>>;
  patch<Body, ResponseData>({
    url,
    headers,
    body,
  }: PatchMethodParams<Body>): Promise<IResult<ResponseData>>;
  put<Body, ResponseData>({
    url,
    headers,
    body,
  }: PutMethodParams<Body>): Promise<IResult<ResponseData>>;
  delete<Body, ResponseData>({
    url,
    headers,
    body,
  }: DeleteMethodParams<Body>): Promise<IResult<ResponseData>>;
}
