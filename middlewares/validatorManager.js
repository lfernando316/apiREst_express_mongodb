import axios from "axios";
import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }
        console.log(value);

        await axios.get(value);
        return value;
      } catch (error) {
        // console.log(error);
        throw new Error("not found longlink 404");
      }
    }),
  validationResultExpress,
];

export const bodyRegisterValidator = [
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
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "minimo 6 caracteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];
