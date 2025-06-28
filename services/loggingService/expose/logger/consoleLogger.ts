import baseLogger from "./baseLogger";
import fs, { lstatSync } from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { requestObject, responeObject } from "../types/types";
import { requestObjectEmpty, responseObjectEmpty } from "../error/baseError";
import { time } from "console";
class consoleLogger extends baseLogger {
  private logMessage: string | null = null;
  reqObj: requestObject | null = null;
  resObj: responeObject | null = null;
  private readonly duration: number = 0;
  constructor(reqObj: requestObject, resObj: responeObject, duration: number) {
    super();
    this.reqObj = reqObj;
    this.resObj = resObj;
    this.duration = duration;
  }
  //generate logger
  public genLog(): string {
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
    if (
      this.reqObj?.user?.firstname != undefined ||
      this.reqObj?.user?.lastname
    ) {
      this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
    } else {
      this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}`;
    }
    return this.logMessage;
  }
  public genJSONLog(): string {
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
    if (
      this.reqObj?.user?.firstname != undefined ||
      this.reqObj?.user?.lastname
    ) {
      this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} user: ${this.reqObj?.user} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
    } else {
      this.logMessage = `[${this.reqObj?.level}] HTTP REQUEST - { method: ${this.reqObj?.method}, url: ${this.reqObj?.url}, header: [${this.reqObj?.header?.domain} ${this.reqObj?.header?.host} ${this.reqObj?.header?.raw_header}] status: ${this.resObj?.statusCode} } status_message: ${this.reqObj?.message} response_header: ${this.resObj?.header} timestamp: ${timeStamp} duration: ${this.duration}\n`;
    }
    this.logMessage = JSON.stringify(this.logMessage);
    return this.logMessage;
  }

  public async writeToOutput(): Promise<void> {
    console.log(this.logMessage);
  }

  public override toString(): void {
    console.log("Successfully written to file");
  }
}

export default consoleLogger;
