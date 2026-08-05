import { fail, success, type IResult } from '../primitives'
import { HttpError } from './http.error'


export async function inspectResponse<ResponseData>(request: Promise<Response>): Promise<IResult<ResponseData>> {
  const response: Response = await request
  const isAtJsonFormat: boolean = response.headers.get('Content-Type')?.includes('application/json') ?? false
  const responseData: ResponseData = isAtJsonFormat ? await response.json() : await response.text()
  if (!response.ok) {
    return fail<ResponseData>(new HttpError(responseData))
  }
  if (responseData === '') {
    return success(undefined) as IResult<ResponseData>
  }
  return success(responseData)
}
