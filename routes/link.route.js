import { Router } from "express";
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

// Get       /api/v1/links           all links
// GEt       /api/v1/links/:id       single link
//Post       /api/v1/links            create link
//patch      /api/v1/links            update link
// Delete    /api/v1/links           remove link

router.get("/", requireToken, getLinks);
router.get("/:nanoLink", getLink);
router.post("/", requireToken, bodyLinkValidator, createLink);
router.delete("/:id", requireToken, removeLink);
router.patch("/:id", requireToken, bodyLinkValidator, updateLink);

export default router;
