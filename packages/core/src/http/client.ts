import { type IResult } from '../result'
import { type DeleteMethodParams, type GetMethodParams, HttpMethod, type PatchMethodParams, type PostMethodParams, type PutMethodParams } from './types'
import { inspectRequest } from './utils'


export class HttpClient {
  static get = async <ResponseData>({ url, headers }: GetMethodParams): Promise<IResult<ResponseData>> =>
    await inspectRequest(
      fetch(
        url,
        {
          method: HttpMethod.GET,
          headers
        }
      )
    )

  static post = async <Body, ResponseData>({ url, headers, body }: PostMethodParams<Body>): Promise<IResult<ResponseData>> =>
    await inspectRequest(
      fetch(
        url,
        {
          method: HttpMethod.POST,
          headers,
          body: body && JSON.stringify(body)
        }
      )
    )

  static patch = async <Body, ResponseData>({ url, headers, body }: PatchMethodParams<Body>): Promise<IResult<ResponseData>> =>
    await inspectRequest(
      fetch(
        url,
        {
          method: HttpMethod.PATCH,
          headers,
          body: JSON.stringify(body)
        }
      )
    )

  static put = async <Body, ResponseData>({ url, headers, body }: PutMethodParams<Body>): Promise<IResult<ResponseData>> =>
    await inspectRequest(
      fetch(
        url,
        {
          method: HttpMethod.PUT,
          headers,
          body: JSON.stringify(body)
        }
      )
    )

  static delete = async <Body, ResponseData>({ url, headers, body }: DeleteMethodParams<Body>): Promise<IResult<ResponseData>> =>
    await inspectRequest(
      fetch(
        url,
        {
          method: HttpMethod.DELETE,
          headers,
          body: body && JSON.stringify(body)
        }
      )
    )
}
