import pg from "pg";
const { Pool } = pg;
import consoleLogger from "../expose/logger/consoleLogger";
import loggerLevel from "../expose/logger/loggerLevels";

const connectionOptionToCreateDatabaseAndTables = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT as unknown as number,
};

const pool = new Pool(connectionOptionToCreateDatabaseAndTables);

pool.on("error", (err) => {
  const unusedObject = Object.assign({}, {});
  const consoleLoggerInstance1 = new consoleLogger(
    unusedObject,
    unusedObject,
    0,
    `An error occured while trying to create a new pool of client ${err}`,
    true,
    loggerLevel.info,
    "No request",
    "No response"
  );
});

export default pool;
