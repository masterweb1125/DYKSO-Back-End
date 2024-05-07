import { Router } from "express";
import { addService, fetchServices, fetchSingleService, fetchZipCodeServices, sendEmailQuery } from "../controller/service.controller.js";
const serviceRouter = Router();

serviceRouter.post("/", addService);
serviceRouter.get("/allservices/:id", fetchServices);
serviceRouter.get("/allservices/:zipCode/:id", fetchZipCodeServices);
serviceRouter.get("/:id", fetchSingleService);
serviceRouter.post("/send-customer-email", sendEmailQuery)

export default serviceRouter;
