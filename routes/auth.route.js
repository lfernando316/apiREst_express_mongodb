import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
// http://localhost:500/api/v1/auth/login
// {
//   "email": "lfernando316@hotmail.com",
//   "password": "123123",
//   "repassword": "123123"
// }

router.get("/protected", requireToken, infoUser);
// http://localhost:500/api/v1/auth/protected

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/logout", logout);

export default router;
