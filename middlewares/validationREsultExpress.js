import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("11111");

    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
