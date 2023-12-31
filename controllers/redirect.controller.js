import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ nanoLink });
    // console.log(link);

    if (!link) return res.status(404).json({ error: "No existe el link" });

    return res.redirect(link.longLink);
  } catch (error) {
    console.log(error);
    if (error.Kind === "ObjectId") {
      return res.status(403).json({ error: "formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
