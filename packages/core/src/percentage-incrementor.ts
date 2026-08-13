export interface PercentageIncrementorState {
  achivmentOnPercent: number;
}

export type OnIncrementCallback = (state: PercentageIncrementorState) => void;

export class PercentageIncrementor {
  private achivementIncrement = 0;
  private readonly onIncrementCallbacks: OnIncrementCallback[] = [];

  constructor(private readonly incrementMax: number) {}

  increment(): void {
    this.achivementIncrement++;
    this.onIncrementCallbacks.forEach(
      (onIncrementCallback: OnIncrementCallback): void => {
        onIncrementCallback({
          achivmentOnPercent: Math.floor(
            (100 / this.incrementMax) * this.achivementIncrement
          ),
        });
      }
    );
  }

  onIncrement(onIncrementCallback: OnIncrementCallback): void {
    this.onIncrementCallbacks.push(onIncrementCallback);
  }
}
