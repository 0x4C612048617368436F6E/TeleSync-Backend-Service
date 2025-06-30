class baseError extends Error {
  constructor() {
    super();
  }
}

//create custom error based
class writeToFileError extends baseError {}

export class requestObjectEmpty extends baseError {
  constructor() {
    super();
    this.name = "Request Object Empty";
    this.message = "Can not have an empty Requat Object";
  }
}

export class responseObjectEmpty extends baseError {
  constructor() {
    super();
    this.name = "Response Object Empty";
    this.message = "Can not have an empty Response Object";
  }
}

export class kafkaError extends baseError {
  constructor(err: any) {
    super();
    this.name = "Kafka connection error";
    this.message = `An error occured while trying to connect to broker ${err}`;
  }
}

export class kafkaTopicAlreadyExistError extends baseError {
  constructor() {
    super();
    this.name = "Kafka Topic Already Exist";
    this.message = `An error occured while trying to create Topic`;
  }
}
