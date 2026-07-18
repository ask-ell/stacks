type PromiseFactory = () => Promise<void>

export class PromisesRunner {
  private readonly promisesFactories: PromiseFactory[] = []

  add(promiseFactory: () => Promise<void>): void {
    this.promisesFactories.push(promiseFactory)
  }

  async runTogether(): Promise<unknown[]> {
    return await Promise.all(this.promisesFactories.map(
      async promiseFactory => { await promiseFactory() }
    ))
  }
}
