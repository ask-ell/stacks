interface ChangeDetection<Data> {
  previous: Data
  current: Data
}

export type ChangesDetection<Data extends object, Key extends keyof Data = keyof Data> = {
  [key in Key]?: ChangeDetection<Data[key]>;
}

export const detectChanges = <Data extends object>(oldVersion: Data) => (newVersion: Data): ChangesDetection<Data> => {
  const changesDetection: ChangesDetection<Data> = {};
  (Object.keys(oldVersion) as Array<keyof Data>).forEach((key): void => {
    changesDetection[key] = {
      previous: oldVersion[key],
      current: newVersion[key]
    }
  })
  return changesDetection
}
