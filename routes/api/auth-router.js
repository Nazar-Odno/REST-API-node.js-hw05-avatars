// группа маршрутов на авторизацию и регистрацию
import express from "express";

import authController from "../../controllers/auth-controller.js";
import { upload } from "../../middlewares/upload.js";
import {
  isEmptyBody,
  isEmptyBodyPatch,
  isEmptyBodyPut,
} from "../../middlewares/isEmptyBody.js";

import { authenticate } from "../../middlewares/authenticate.js";

import { validateBody } from "../../decorators/index.js";

import { userSigninShema, userSignupShema } from "../../models/User.js";

const authRouter = express.Router();

//регистрация нового пользователя
authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);

//логинизация
authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signin
);

//получение токена по запросу
authRouter.get("/current", authenticate, authController.GetCurrent);

//логаут
authRouter.post("/signout", authenticate, authController.signout);
export default authRouter;

//Изменение аватарки
authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authController.ChangeAvatar
);
