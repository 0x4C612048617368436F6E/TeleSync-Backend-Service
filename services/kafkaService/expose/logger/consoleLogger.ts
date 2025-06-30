import baseLogger from "./baseLogger";
import { requestObject, responeObject } from "../types/types";
import { requestObjectEmpty, responseObjectEmpty } from "../error/baseError";
class consoleLogger extends baseLogger {
  private logMessage: string | null = null;
  reqObj: requestObject | null = null;
  resObj: responeObject | null = null;
  private readonly duration: number = 0;
  private readonly args: string[] = [];
  private readonly noReqOrRes: string | null = null;
  private readonly normalOrJson: boolean = true;
  constructor(
    reqObj: requestObject = {},
    resObj: responeObject = {},
    duration: number = 0,
    noReqOrRes?: string,
    normalOrJson: boolean = true,
    ...args: string[]
  ) {
    super();
    this.reqObj = reqObj;
    this.resObj = resObj;
    this.duration = duration;
    this.args = args;
    this.noReqOrRes = noReqOrRes as unknown as string | null;
    this.normalOrJson = normalOrJson;
  }
  //generate logger
  public genLog(): void {
    //
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
    let timeStamp = new Date().toString();
    if (this.args.length > 0) {
      if (
        this.reqObj?.user?.firstname != undefined ||
        this.reqObj?.user?.lastname
      ) {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
      } else {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
      }
    } else {
      this.logMessage = this.noReqOrRes;
      return;
    }

    return;
  }
  public genJSONLog(): void {
    //
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
    let timeStamp = new Date().toString();
    if (this.args.length > 0) {
      if (
        this.reqObj?.user?.firstname != undefined ||
        this.reqObj?.user?.lastname
      ) {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
      } else {
        this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
      }
    } else {
      this.logMessage = JSON.stringify(this.noReqOrRes);
      return;
    }

    this.logMessage = JSON.stringify(this.logMessage);
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
