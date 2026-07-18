import { _if } from "./boolean";

describe("Booleans", () => {
  describe(_if.name, () => {
    it("Should return first output from true condition", () => {
      expect(_if(true)(0)(1)).toBe(0);
    });
    it("Should return second output from false condition", () => {
      expect(_if(false)(0)(1)).toBe(1);
    });
  });
});
