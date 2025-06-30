import baseLogger from "./baseLogger";
import { requestObject, responeObject } from "../types/types";
import { requestObjectEmpty, responseObjectEmpty } from "../error/baseError";
import loggerLevel from "./loggerLevels";
class consoleLogger extends baseLogger {
  private logMessage: any; //string | null = null;
  reqObj: requestObject | null = null;
  resObj: responeObject | null = null;
  private readonly duration: number = 0;
  private readonly args: string[] = [];
  private readonly noReqOrRes: string | null = null;
  private readonly normalOrJson: boolean = true;
  private readonly level: string | null = null;
  constructor(
    reqObj: requestObject = {},
    resObj: responeObject = {},
    duration: number = 0,
    noReqOrRes?: string,
    normalOrJson: boolean = true,
    level: string = loggerLevel.info,
    ...args: string[]
  ) {
    super();
    this.reqObj = reqObj;
    this.resObj = resObj;
    this.duration = duration;
    this.args = args;
    this.noReqOrRes = noReqOrRes as unknown as string | null;
    this.normalOrJson = normalOrJson;
    this.level = level;
  }
  //generate logger
  public genLog(): void {
    let timeStamp = new Date().toString();
    console.log("Length is: ", this.args.length);
    if (this.args.length === 0) {
      try {
        if (this.reqObj == null) {
          throw new requestObjectEmpty();
        }

        //when response sent
        if (this.resObj == null) {
          throw new responseObjectEmpty();
        }
      } catch (err) {
        console.error("An error occured: ", err);
      } finally {
        console.log("Done");
      }

      if (
        this.reqObj?.user?.firstname != undefined ||
        this.reqObj?.user?.lastname
      ) {
        this.reqObj.level = this.level as unknown as string | undefined;
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
      } else {
        if (this.reqObj) {
          this.reqObj.level = this.level as unknown as string | undefined;
          this.logMessage = `level:[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
        }
      }
    } else {
      this.logMessage = `level:${this.level}, timestamp:${timeStamp}, message:${this.noReqOrRes}`;
      return;
    }

    return;
  }
  public genJSONLog(): void {
    let timeStamp = new Date().toString();
    if (this.args.length === 0) {
      try {
        if (this.reqObj == null) {
          throw new requestObjectEmpty();
        }

        //when response sent
        if (this.resObj == null) {
          throw new responseObjectEmpty();
        }
      } catch (err) {
        console.error("An error occured: ", err);
      }

      if (
        this.reqObj?.user?.firstname != undefined ||
        this.reqObj?.user?.lastname
      ) {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
      } else {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
      }
    } else {
      this.logMessage = Object.assign(
        {},
        { level: this.level, timestamp: timeStamp, message: this.noReqOrRes }
      );
      return;
    }
    return;
  }

  public async writeToOutput(): Promise<void> {
    if (this.normalOrJson) {
      this.genJSONLog();
      console.log(this.logMessage);
    } else {
      this.genLog();
      console.log(this.logMessage);
    }
  }

  public override toString(): void {
    console.log("Successfully written to file");
  }
}

export default consoleLogger;
