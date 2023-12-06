import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody, isEmptyFavorite, isEmptyEmail, uploadAvatar } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userLoginSchema, userRegisterSchema, userSubscriptionSchema, userEmailSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), authController.register);
authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), authController.login);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.get("/current", authenticate, authController.current);
authRouter.patch("/", authenticate, validateBody(userSubscriptionSchema), authController.subcriptionUpd);

authRouter.patch("/avatars", authenticate, uploadAvatar.single("avatar"), authController.avatarUpdate);

authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", isEmptyEmail, validateBody(userEmailSchema), authController.resendVerify);

export default authRouter;
