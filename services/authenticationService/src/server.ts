import express from "express";
import loggerMiddleware from "../expose/middleware/loggerMiddleware";
import consoleLogger from "../expose/logger/consoleLogger";
import loggerLevel from "../expose/logger/loggerLevels";
import rootRoute from "../routes/rootRoute";
import registrationRoute from "../routes/registrationRoute";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use("/", rootRoute);
app.use("/register", registrationRoute);

app.listen(PORT, () => {
  const unusedObject = Object.assign({}, {});
  const consoleLoggerInstance1 = new consoleLogger(
    unusedObject,
    unusedObject,
    0,
    `Server is listening on port ${PORT}`,
    true,
    loggerLevel.info,
    "No request",
    "No response"
  );
  consoleLoggerInstance1.writeToOutput();
});
