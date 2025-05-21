import express from "express";

import {
  registerUser,
  loginUser,
  currentUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/current").get(currentUser);

export default router;
