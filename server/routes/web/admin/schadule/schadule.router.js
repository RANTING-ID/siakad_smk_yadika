import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./schadule.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getSchadulePage);
router.route("/add").get(index.addSchadulePage);


export default router;