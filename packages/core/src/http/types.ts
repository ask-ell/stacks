export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface CommonMethodParams {
  url: URL;
  headers?: HeadersInit;
}

export type GetMethodParams = CommonMethodParams;

export type PostMethodParams<Body> = CommonMethodParams & {
  body?: Body;
};

export type PatchMethodParams<Body> = CommonMethodParams & {
  body: Body;
};

export type PutMethodParams<Body> = CommonMethodParams & {
  body: Body;
};

export type DeleteMethodParams<Body> = CommonMethodParams & {
  body?: Body;
};
