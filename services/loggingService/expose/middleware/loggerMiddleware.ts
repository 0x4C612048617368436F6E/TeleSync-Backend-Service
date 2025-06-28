import { REQUESTOBJECT, RESPONSEOBJECT, NEXTFUNCTION } from "../types/types";
const loggerMiddleware = (
  req: REQUESTOBJECT,
  res: RESPONSEOBJECT,
  next: NEXTFUNCTION
) => {
  let start: number = Date.now();
  let duration: number;
  res.on("finish", () => {
    let end: number = Date.now();
    duration = end - start;
  });
};
