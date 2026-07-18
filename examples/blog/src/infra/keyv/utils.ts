import { wait } from '@ask-ell/core'
import type { Id } from '@ask-ell/ddd'


// TODO: remove
export const generateRandomId: () => Id = () =>
  new Date().getTime().toString()

export const fakeWait = async (): Promise<void> => wait(0)

export const breakReference = <T>(object: T): T => ({ ...object })
