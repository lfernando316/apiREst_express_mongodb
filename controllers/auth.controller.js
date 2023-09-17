import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    //jwt token

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// http://localhost:500/api/v1/auth/register
// {
//     "email": "lfernando316@hotmail.com",
//     "password": "123123",
//     "repassword": "123123"
//   }

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "no existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res
        .status(403)
        .json({ error: "Contraseña incorrecta o correo invalido" });

    // Generar el token JWT
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.json({ ok: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
