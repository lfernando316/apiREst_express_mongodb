import { Router } from "express";
import { createLink, getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

// Get       /api/v1/links           all links
// GEt       /api/v1/links/:id       single link
//Post       /api/v1/links            create link
//patch      /api/v1/links            update link
// Delete    /api/v1/links           remove link

router.get("/", requireToken, getLinks);
router.post("/", requireToken, bodyLinkValidator, createLink);

export default router;
