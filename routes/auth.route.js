import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post(
  "/register",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "minimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "formato de password incorrecta").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("no coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);
// http://localhost:500/api/v1/auth/login
// {
//   "email": "lfernando316@hotmail.com",
//   "password": "123123",
//   "repassword": "123123"
// }

router.get("/protected", requireToken, infoUser);
// http://localhost:500/api/v1/auth/protected

router.get("/refresh", refreshToken);

router.get("/logout", logout);

export default router;
