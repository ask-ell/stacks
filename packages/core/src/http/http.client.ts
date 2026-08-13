import type { IResult } from '../primitives';
import {
  DeleteMethodParams,
  GetMethodParams,
  HttpMethod,
  PatchMethodParams,
  PostMethodParams,
  PutMethodParams,
} from './types';
import { IHttpClient } from './http.client.interface';
import { inspectResponse } from './utils';

export class HttpClient implements IHttpClient {
  async get<ResponseData>({
    url,
    headers,
  }: GetMethodParams): Promise<IResult<ResponseData>> {
    return inspectResponse(
      fetch(url, {
        method: HttpMethod.GET,
        headers,
      })
    );
  }

  async post<Body, ResponseData>({
    url,
    headers,
    body,
  }: PostMethodParams<Body>): Promise<IResult<ResponseData>> {
    return inspectResponse(
      fetch(url, {
        method: HttpMethod.POST,
        headers,
        body: body && JSON.stringify(body),
      })
    );
  }

  async patch<Body, ResponseData>({
    url,
    headers,
    body,
  }: PatchMethodParams<Body>): Promise<IResult<ResponseData>> {
    return inspectResponse(
      fetch(url, {
        method: HttpMethod.PATCH,
        headers,
        body: JSON.stringify(body),
      })
    );
  }

  async put<Body, ResponseData>({
    url,
    headers,
    body,
  }: PutMethodParams<Body>): Promise<IResult<ResponseData>> {
    return inspectResponse(
      fetch(url, {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify(body),
      })
    );
  }

  async delete<Body, ResponseData>({
    url,
    headers,
    body,
  }: DeleteMethodParams<Body>): Promise<IResult<ResponseData>> {
    return inspectResponse(
      fetch(url, {
        method: HttpMethod.DELETE,
        headers,
        body: body && JSON.stringify(body),
      })
    );
  }
}
