abstract class baseLogger {
  public abstract genLog(): string;
  public abstract genJSONLog(): string;
  /**
   * Output can either be file or console
   */
  public abstract writeToOutput(): Promise<void>;

  public toString() {
    //
    console.log("Base Logger");
  }
}

export default baseLogger;
