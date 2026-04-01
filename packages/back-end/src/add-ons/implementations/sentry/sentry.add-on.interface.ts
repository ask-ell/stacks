import { IEntity } from "@ask-ell/core";

import { ISentryAddOnState } from "./sentry.add-on.state.interface";
import { IAddOn } from "../../add-on.interface";


export interface ISentryAddOn<T>
  extends IEntity<ISentryAddOnState>, IAddOn<T> { }