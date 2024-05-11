import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./payment.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getPaymentPage);


export default router;