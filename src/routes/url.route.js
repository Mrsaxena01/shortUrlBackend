import express from "express";
import { shortenUrl, redirectToOriginalUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);

export default router;