import express from "express";
//assuming user is logged in
interface user {
  firstname?: string;
  lastname?: string;
}

export interface headerRequest {
  host?: string;
  raw_header?: string[];
}

export interface headerResponse {
  "x-powered-by"?: string; //how to extract
}

export interface requestObject {
  method?: string;
  url?: string;
  header?: headerRequest;
  user?: user;
  level?: string;
  message?: string;
  [other: string]: any;
}

export interface responeObject {
  statusCode?: number;
  statusMessage?: string;
  header?: headerResponse;
  totals_duration?: number;
  timestamp?: string;
  [other: string]: any;
}

export type voidFunction = () => void;
export type REQUESTOBJECT = express.Request;
export type RESPONSEOBJECT = express.Response;
export type NEXTFUNCTION = express.NextFunction;
export type ERRORHANDLER = express.ErrorRequestHandler;
