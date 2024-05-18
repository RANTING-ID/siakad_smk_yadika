import express from "express";
import * as kelas from "./kelas.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes]
router.route("/:id").get(kelas.getOneById);

export default router;
