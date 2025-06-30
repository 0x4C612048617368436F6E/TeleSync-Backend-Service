import fs from "fs";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: any, res: any, next: any) => {
  console.log("Request: ", req);
  //console.log("Response: ", res);
  //console.log("Next: ", next);
});

app.listen(5000, () => {
  console.log("Server listing");
});
