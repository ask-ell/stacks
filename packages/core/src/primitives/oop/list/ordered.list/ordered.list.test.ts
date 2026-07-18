import { OrderableList } from "./ordered.list";
import { OrderedListElement } from "./types";

describe(OrderableList.name, () => {
  it("Should a new orderable list reflect correct positions", () => {
    const orderableList = new OrderableList([0, 1, 2, 3, 4, 5]);
    orderableList.forEach((element: OrderedListElement<number>) => {
      expect(element.position).toEqual(element.value);
    });
  });
});
