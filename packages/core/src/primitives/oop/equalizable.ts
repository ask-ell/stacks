export interface IEqualizable<EqualizableType> {
  isEquals: (valueToCompare: EqualizableType) => boolean;
}
