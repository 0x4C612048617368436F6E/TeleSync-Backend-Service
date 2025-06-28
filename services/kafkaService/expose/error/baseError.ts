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
