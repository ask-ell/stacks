import { TestMustFailError } from "../../errors";
import { matchEither } from "./either";
import { pipe } from "./function";

import {
  fail,
  matchProcess,
  success,
  runProcess,
  runAsyncProcess,
  runProcessOnEachElement,
  emptySuccess,
  ProcessResultOrError,
} from "./process";

class CustomError extends Error {}

describe(matchProcess.name, () => {
  it("Should return success", () => {
    const numberGetter = () => success(2);

    pipe(
      numberGetter(),
      matchProcess((n: number) => success(n * 2)),
      matchEither(
        (n: number) => {
          expect(n).toBe(4);
        },
        (error: Error) => {
          throw error;
        }
      )
    );
  });

  it("Should return fail", () => {
    const numberGetter = (): ProcessResultOrError<number> =>
      fail(new CustomError());

    pipe(
      numberGetter(),
      matchProcess((n: number) => success(n * 2)),
      matchEither(
        () => {
          throw new TestMustFailError();
        },
        (error: Error) => {
          expect(error).toBeInstanceOf(CustomError);
        }
      )
    );
  });
});

describe(runProcess.name, () => {
  it("Should success", () => {
    try {
      const n: number = runProcess(() => success(0));
      expect(n).toBe(0);
    } catch (error) {
      throw error;
    }
  });

  it("Should fail", () => {
    try {
      runProcess(() => fail(new CustomError()));
      throw new TestMustFailError();
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
    }
  });
});

describe(runAsyncProcess.name, () => {
  it("Should success", async () => {
    try {
      const n: number = await runAsyncProcess(() =>
        Promise.resolve(success(0))
      );
      expect(n).toBe(0);
    } catch (error) {
      throw error;
    }
  });

  it("Should fail", async () => {
    try {
      await runAsyncProcess(() => Promise.resolve(fail(new CustomError())));
      throw new TestMustFailError();
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
    }
  });
});

describe(runProcessOnEachElement.name, () => {
  it("Should transform array data", () => {
    const data = [1, 2, 3];
    pipe(
      runProcessOnEachElement((n: number) => success(n * 2))(data),
      matchEither(
        (transformedData: number[]) => {
          expect(transformedData).toEqual([2, 4, 6]);
          return emptySuccess;
        },
        (error: Error) => {
          throw error;
        }
      )
    );
  });

  it("Should fail", () => {
    const data = [1, 2, 3];
    let callTimes = 0;

    pipe(
      runProcessOnEachElement(() => {
        callTimes++;
        return fail(new CustomError());
      })(data),
      matchEither(
        (_) => {
          throw new TestMustFailError();
        },
        (error: Error) => {
          expect(callTimes).toBe(1);
          expect(error).toBeInstanceOf(CustomError);
        }
      )
    );
  });
});
