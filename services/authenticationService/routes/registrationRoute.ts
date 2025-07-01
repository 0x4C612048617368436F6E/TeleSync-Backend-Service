import express from "express";
import registrationController from "../controllers/registrationController";
const registrationRoute = express.Router();

registrationRoute.post("/", registrationController);

export default registrationRoute;
