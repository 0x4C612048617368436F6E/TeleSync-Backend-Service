import {
  REQUESTOBJECT,
  RESPONSEOBJECT,
  NEXTFUNCTION,
  ERRORHANDLER,
} from "../types/types";
const errorMiddleware = (
  err: ERRORHANDLER,
  req: REQUESTOBJECT,
  res: RESPONSEOBJECT,
  next: NEXTFUNCTION
) => {};
