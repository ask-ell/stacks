import Keyv from 'keyv';

export class KeyvClient<RowData> {
  constructor(protected instance: Keyv<RowData>) {}

  protected async *getAllDataGenerator(): AsyncGenerator<RowData> {
    for await (const [, value] of this.getIterator()) {
      yield value;
    }
  }

  private getIterator(): AsyncGenerator<[string, RowData], void> {
    if (!this.instance.iterator) {
      throw new Error('Iterator not available');
    }
    return this.instance.iterator(undefined);
  }
}
