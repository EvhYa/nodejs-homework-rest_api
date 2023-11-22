import express from "express";

import authController from "../../controllers/auth-controller.js";

import { isEmptyBody, isEmptyFavorite } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import { userRegisterSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), authController.register);
// authRouter.post("/login");

export default authRouter;
