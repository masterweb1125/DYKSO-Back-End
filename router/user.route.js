import { Router } from "express";

import { Unfollow_up, follow_up } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/:userId/follow-up", follow_up);
userRouter.post("/:userId/unfollow-up",Unfollow_up);


export default userRouter; 
