import { Router } from "express";
import { addService, fetchServices, fetchSingleService, sendEmailQuery } from "../controller/service.controller.js";
const serviceRouter = Router();

serviceRouter.post("/", addService);
serviceRouter.get("/:zipCode/:id", fetchServices);
serviceRouter.get("/:id", fetchSingleService);
serviceRouter.post("/sendquery", sendEmailQuery)

export default serviceRouter;
