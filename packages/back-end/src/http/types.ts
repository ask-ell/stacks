export type HttpResponseBody<Data = unknown> = {
  message: string;
  data?: Data;
};
