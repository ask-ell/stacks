import { appendSearchParams, URLFactoryFromRootURL } from '@ask-ell/core';

import { SearchNamespacesDTO } from '../../dto/inputs/namespace/search-namespace.dto';

export const searchNamespacesUrlFactory: URLFactoryFromRootURL<
  SearchNamespacesDTO
> = (rootURL: URL) => appendSearchParams(new URL('namespaces', rootURL));
