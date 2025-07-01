import express from "express";
import rootControllerGET from "../controllers/rootController";
const rootRoute = express.Router();

rootRoute.get("/", rootControllerGET);

export default rootRoute;
