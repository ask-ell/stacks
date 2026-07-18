import type { CssFile } from './css.file'
import type { JsFile } from './js.file'


export interface IHTMLViewData {
  title: string
  description: string
  additionalCssFiles?: CssFile[]
  additionalScripts?: JsFile[]
}
