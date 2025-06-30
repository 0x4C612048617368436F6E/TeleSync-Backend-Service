import baseLogger from "./baseLogger";
import fs, { lstatSync } from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { requestObject, responeObject } from "../types/types";
import { requestObjectEmpty, responseObjectEmpty } from "../error/baseError";
class fileLogger extends baseLogger {
  private readonly fileName: string = path.join("..", "..", "log", "logs.log");
  private readonly folderName: string = path.join("..", "..", "log");
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
    noReqOrRes: string = "",
    normalOrJson: boolean = true,
    ...args: string[]
  ) {
    super();
    this.reqObj = reqObj;
    this.resObj = resObj;
    this.duration = duration;
    this.args = args;
    this.noReqOrRes = noReqOrRes as unknown as string | null;
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
    if (this.args.length === 0) {
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
      //Where most of the logic goes
      if (fs.existsSync(this.folderName)) {
        //check if file exist, just in case
        if (fs.existsSync(this.fileName)) {
          if (!fs.lstatSync(this.fileName).isDirectory()) {
            await fsPromise.appendFile(
              this.fileName,
              this.logMessage as unknown as string | Uint8Array
            );
          }
        }
      } else {
        //folder does not exist
        await fsPromise.mkdir(this.folderName);
        await fsPromise.writeFile(
          this.fileName,
          this.logMessage as unknown as string | Uint8Array
        );
      }
    } else {
      this.genLog();
      //Where most of the logic goes
      //Where most of the logic goes
      if (fs.existsSync(this.folderName)) {
        //check if file exist, just in case
        if (fs.existsSync(this.fileName)) {
          if (!fs.lstatSync(this.fileName).isDirectory()) {
            await fsPromise.appendFile(
              this.fileName,
              this.logMessage as unknown as string | Uint8Array
            );
          }
        }
      } else {
        //folder does not exist
        await fsPromise.mkdir(this.folderName);
        await fsPromise.writeFile(
          this.fileName,
          this.logMessage as unknown as string | Uint8Array
        );
      }
    }
  }

  public override toString(): void {
    console.log("Successfully written to file");
  }
}

export default fileLogger;
