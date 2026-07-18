import { append, find } from "./array";
import { pipe } from "./function";
import { matchOption } from "./options";

describe("Arrays", () => {
  describe(append.name, () => {
    it("Should append data at the end", () => {
      expect(append(3)([1, 2])).toEqual([1, 2, 3]);
      expect(append(3)([1, 2])).not.toEqual([3, 1, 2]);
    });
  });

  describe(find.name, () => {
    it("Should find wished option", () => {
      interface Data {
        id: number;
        value: string;
      }
      const data: Data[] = [
        { id: 1, value: "Hi" },
        { id: 2, value: "Bye" },
      ];
      const item = find(({ id }: Data) => id === 1)(data);
      pipe(
        item,
        matchOption(
          () => {
            throw new Error("Option must be available here");
          },
          (option) => {
            expect(option.value).toEqual("Hi");
          }
        )
      );
    });
  });
});
