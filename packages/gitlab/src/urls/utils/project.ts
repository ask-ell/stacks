import { URLFactoryFromRootURL } from '@ask-ell/core';

const projectControllerRootUrlFactory = (rootURL: URL) =>
  new URL('projects/', rootURL);

export const createProjectUrlFactory = projectControllerRootUrlFactory;

const oneProjectControllerRootUrlFactory =
  (rootURL: URL) => (projectId: string) =>
    new URL(projectId, projectControllerRootUrlFactory(rootURL));

export const getProjectUrlFactory: URLFactoryFromRootURL<string> =
  oneProjectControllerRootUrlFactory;

export const updateProjectUrlFactory: URLFactoryFromRootURL<string> =
  oneProjectControllerRootUrlFactory;

export const archiveProjectUrlFactory: URLFactoryFromRootURL<string> =
  (rootURL: URL) => (projectId: string) =>
    new URL('archive', oneProjectControllerRootUrlFactory(rootURL)(projectId));

export const unarchiveProjectUrlFactory: URLFactoryFromRootURL<string> =
  (rootURL: URL) => (projectId: string) =>
    new URL(
      'unarchive',
      oneProjectControllerRootUrlFactory(rootURL)(projectId)
    );

export const deleteProjectUrlFactory: URLFactoryFromRootURL<string> =
  oneProjectControllerRootUrlFactory;
