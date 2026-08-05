import { StringDictionnary, type MaybeNullOrUndefined } from '../primitives'
import { isUndefinedOrNull } from '../primitives'


export type URLFactory<DTO> = (dto: DTO) => URL

export type URLFactoryFromRootURL<DTO> = (rootURL: URL) => URLFactory<DTO>

export const appendSearchParams = <DTO extends StringDictionnary>(url: URL): URLFactory<DTO> => (dto: DTO) => {
  const clonedUrl: URL = new URL(url)
  Object.keys(dto).forEach((key: string): void => {
    const value: MaybeNullOrUndefined<string> = dto[key]
    if (isUndefinedOrNull(value)) {
      return
    }
    clonedUrl.searchParams.set(key, value)
  })
  return clonedUrl
}
