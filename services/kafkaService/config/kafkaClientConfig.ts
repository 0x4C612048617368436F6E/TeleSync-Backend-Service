import { Kafka } from "kafkajs";
import fileLogger from "../expose/logger/fileLogger";
import consoleLogger from "../expose/logger/consoleLogger";
import loggerLevel from "../expose/logger/loggerLevels";
const unusedObject = Object.assign({}, {});
const kafkaOptions = {
  clientId: "TeleSync",
  brokers: ["localhost:9094"],
};
const consoleLoggerInstance1 = new consoleLogger(
  unusedObject,
  unusedObject,
  0,
  "Connecting to broker",
  true,
  loggerLevel.info,
  "No request",
  "No response"
);
consoleLoggerInstance1.writeToOutput();

const kafka = new Kafka(kafkaOptions);

if (!kafka) {
  const consoleLoggerInstance2 = new consoleLogger(
    unusedObject,
    unusedObject,
    0,
    `An Error occurred`,
    true,
    "No request",
    "No response"
  );
}

export default kafka;
