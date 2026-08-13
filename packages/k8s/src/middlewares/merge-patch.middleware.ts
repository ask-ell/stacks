import {
  Observable,
  ObservableMiddleware,
  RequestContext,
  ResponseContext,
} from '@kubernetes/client-node';

export const MERGE_PATCH_MIDDLEWARE: ObservableMiddleware = {
  pre: (context: RequestContext): Observable<RequestContext> => {
    context.setHeaderParam('Content-Type', 'application/merge-patch+json');
    return new Observable(Promise.resolve(context));
  },
  post: (context: ResponseContext): Observable<ResponseContext> =>
    new Observable(Promise.resolve(context)),
};
