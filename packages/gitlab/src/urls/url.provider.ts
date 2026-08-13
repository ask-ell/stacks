import { URLFactory } from '@ask-ell/core';

import { SearchNamespacesDTO } from '../dto/inputs/namespace/search-namespace.dto';
import { searchNamespacesUrlFactory } from './utils/namespace';
import {
  archiveProjectUrlFactory,
  createProjectUrlFactory,
  deleteProjectUrlFactory,
  getProjectUrlFactory,
  unarchiveProjectUrlFactory,
  updateProjectUrlFactory,
} from './utils/project';

export class URLProvider {
  readonly searchNamespacesUrlFactory: URLFactory<SearchNamespacesDTO>;
  readonly getProjectUrlFactory: URLFactory<string>;
  readonly createProjectUrl: URL;
  readonly updateProjectUrlFactory: URLFactory<string>;
  readonly archiveProjectUrlFactory: URLFactory<string>;
  readonly unarchiveProjectUrlFactory: URLFactory<string>;
  readonly deleteProjectUrlFactory: URLFactory<string>;

  constructor(rootURL: URL) {
    this.searchNamespacesUrlFactory = searchNamespacesUrlFactory(rootURL);
    this.getProjectUrlFactory = getProjectUrlFactory(rootURL);
    this.createProjectUrl = createProjectUrlFactory(rootURL);
    this.updateProjectUrlFactory = updateProjectUrlFactory(rootURL);
    this.archiveProjectUrlFactory = archiveProjectUrlFactory(rootURL);
    this.unarchiveProjectUrlFactory = unarchiveProjectUrlFactory(rootURL);
    this.deleteProjectUrlFactory = deleteProjectUrlFactory(rootURL);
  }
}
