import {
  REQUESTOBJECT,
  RESPONSEOBJECT,
  NEXTFUNCTION,
  responeObject,
} from "../types/types";
import consoleLogger from "../logger/consoleLogger";
import fileLogger from "../logger/fileLogger";
import { requestObject } from "../types/types";
import { headerRequest } from "../types/types";
import loggerLevel from "../logger/loggerLevels";
import { headerResponse } from "../types/types";

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

    //request stuff
    const extractRequestObject: requestObject = {};
    const headerRequestObject: headerRequest = {};
    extractRequestObject.method = req.method;
    extractRequestObject.url = req.url;
    //extractRequestObject.header.host = req.host
    extractRequestObject.level = loggerLevel.info;
    extractRequestObject.message = "Just checking some stuff";
    headerRequestObject.host = req.host;
    headerRequestObject.raw_header = req.rawHeaders;
    extractRequestObject.header = headerRequestObject;
    console.log("Duration: ", duration);
    //response stuff
    const extractResposnseObject: responeObject = {};
    const headerResponseObject: headerResponse = {};
    extractResposnseObject.statusCode = res.statusCode;
    extractResposnseObject.statusMessage = res.statusMessage;
    extractResposnseObject.totals_duration = duration;
    extractResposnseObject.timestamp = new Date().toString();
    //headerResponseObject["x-powered-by"] = req[req]     HOW TO EXTRACT

    const fileLoggerInstance1 = new consoleLogger(
      extractRequestObject,
      extractResposnseObject,
      0,
      "Some logs",
      true
    );
    fileLoggerInstance1.writeToOutput();
  });
  next();
};

export default loggerMiddleware;
