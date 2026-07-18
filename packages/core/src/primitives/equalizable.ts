export interface IEqualizable {
  isEquals: (comparator: this) => boolean;
}
