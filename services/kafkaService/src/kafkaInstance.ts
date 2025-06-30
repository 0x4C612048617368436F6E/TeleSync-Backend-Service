import kafka from "../config/kafkaClientConfig";
import fileLogger from "../expose/logger/fileLogger";
import consoleLogger from "../expose/logger/consoleLogger";
import { kafkaError } from "../expose/error/baseError";
import { kafkaTopicAlreadyExistError } from "../expose/error/baseError";
//create kafka admin
const initiateKafkaInstance = async () => {
  const admin = kafka.admin();
  const unusedObject = Object.assign({}, {});
  //admin connecting
  const fileLoggerInstance1 = new fileLogger(
    unusedObject,
    unusedObject,
    0,
    "admin connection",
    true,
    "No request",
    "No response"
  );
  const consoleLoggerInstance1 = new consoleLogger(
    unusedObject,
    unusedObject,
    0,
    "admin connection",
    true,
    "No request",
    "No response"
  );
  try {
    admin.connect();
    const consoleLoggerInstance2 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      "Kafka connection successful",
      true,
      "No request",
      "No response"
    );

    //create topics
    const consoleLoggerInstance3 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      "Creating kafka topics ['Login','Registration']",
      true,
      "No request",
      "No response"
    );
    let topicAlreadyCreated = await admin.createTopics({
      topics: [
        {
          topic: "login",
        },
        {
          topic: "registration",
        },
      ],
    });
    if (!topicAlreadyCreated) {
      throw new kafkaTopicAlreadyExistError();
    }
    //topic successfully created
    const consoleLoggerInstance4 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      "Topic Successfully Created ['Login','Registration']",
      true,
      "No request",
      "No response"
    );
    //disconnect
    const consoleLoggerInstance5 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      "Disconnecting Admin",
      true,
      "No request",
      "No response"
    );
    admin.disconnect();
    const consoleLoggerInstance6 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      "Admin disconnected",
      true,
      "No request",
      "No response "
    );
  } catch (err: any) {
    //potential error
    const consoleLoggerInstance4 = new consoleLogger(
      unusedObject,
      unusedObject,
      0,
      err,
      true,
      "No request",
      "No response"
    );
    return -1;
  }
};

initiateKafkaInstance();
