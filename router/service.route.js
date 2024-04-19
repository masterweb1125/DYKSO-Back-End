import { Router } from "express";
import { addService, fetchServices, fetchSingleService } from "../controller/service.controller.js";
const serviceRouter = Router();

serviceRouter.post("/", addService);
serviceRouter.get("/:zipCode/:id", fetchServices);
serviceRouter.get("/:id", fetchSingleService);

export default serviceRouter;
