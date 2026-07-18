export async function wait (durationInMilliseconds: number): Promise<void> {
  await new Promise<void>((resolve: () => void): void => {
    setTimeout((): void => {
      resolve()
    }, durationInMilliseconds)
  })
}
