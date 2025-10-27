import { IEntity } from "@ask-ell/core";

import { ISwaggerAddOnState } from "./swagger.add-on.state.interface";
import { IAddOn } from "../../add-on.interface";

export interface ISwaggerAddOn<T>
  extends IEntity<ISwaggerAddOnState>, IAddOn<T> { }