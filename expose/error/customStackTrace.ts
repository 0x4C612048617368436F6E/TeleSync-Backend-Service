import { voidFunction } from "../types/types";

const customStackTrace: voidFunction = (): void => {
  //customise the default stack trace
  const originalError = new Error().stack;
};
