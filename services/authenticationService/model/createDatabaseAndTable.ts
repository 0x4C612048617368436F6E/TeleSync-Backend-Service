//code should only be run ONCE, This creates the database and the actual tables
import pool from "../config/databaseConnection";
import consoleLogger from "../expose/logger/consoleLogger";
import loggerLevel from "../expose/logger/loggerLevels";

const createDatabaseAndTable = async () => {
  try {
    const client = await pool.connect();
    //create database
    let res = await client.query(
      `CREATE DATABASE IF NOT EXISTS authentication_service`
    );

    const unusedObject = Object.assign({}, {});
    const consoleLoggerInstance1 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      `${res.rows}`,
      true,
      loggerLevel.info,
      "No request",
      "No response"
    );
    consoleLoggerInstance1.writeToOutput();

    //create table
    res = await client.query("CREATE SCHEMA user;");
    res = await client.query("CREATE SCHEMA profile;");
    await client.release();
  } catch (err) {
    const unusedObject = Object.assign({}, {});
    const consoleLoggerInstance1 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      `An error occured while trying to connect to the database ${err}`,
      true,
      loggerLevel.info,
      "No request",
      "No response"
    );
    consoleLoggerInstance1.writeToOutput();
  }
};
