import express from "express";
import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  removeContact,
} from "../controller/contactController.js";
import { validateToken } from "../middleware/validateTokenHnadler.js";

const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(removeContact);

export default router;
