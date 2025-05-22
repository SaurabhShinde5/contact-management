import express from "express";

import {
  registerUser,
  loginUser,
  currentUser,
} from "../controller/userController.js";
import { validateToken } from "../middleware/validateTokenHnadler.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

export default router;
