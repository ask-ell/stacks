import { List } from "../list";
import { OrderedListElement } from "./types";

export class OrderableList<T> extends List<OrderedListElement<T>> {
  constructor(elements = new Array<T>()) {
    super();
    elements.forEach((element: T, position: number): void => {
      this.push({
        value: element,
        position,
      });
    });
  }
}
