import { ISentryAddOnState } from "./implementations/sentry/sentry.add-on.state.interface";
import { ISwaggerAddOnState } from "./implementations/swagger/swagger.add-on.state.interface";

export type AddOnWrapperParams = Partial<{
    swagger: ISwaggerAddOnState;
    sentry: ISentryAddOnState;
}>;