interface ChangeDetection<Data> {
  previous: Data
  current: Data
}

export type ChangesDetection<Data extends object, Key extends keyof Data = keyof Data> = {
  [key in Key]?: ChangeDetection<Data[key]>;
}

export const detectChanges = <Data extends object>(oldVersion: Data) => (newVersion: Data): ChangesDetection<Data> => {
  const changesDetection: ChangesDetection<Data> = {}
  Object.keys(oldVersion).forEach((key: string): void => {
    (changesDetection as any)[key] = {
      previous: (oldVersion as any)[key],
      current: (newVersion as any)[key]
    }
  })
  return changesDetection
}
