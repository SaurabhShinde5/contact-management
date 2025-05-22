import asyncHandler from "express-async-handler";

import contactModel from "../models/contactModel.js";

/** @desc Get all contacts */
/** @access private
/** @route GET /api/contacts */
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

/** @desc Create new contacts */
/** @access private
/** @route POST /api/contacts */
export const createContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    res.status(400);
    throw new Error("All fields are mandetory!");
  }

  const contact = await contactModel.create({
    name,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

/** @desc Get contact by ID */
/** @access private
/** @route GET /api/contacts/:id */
export const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

/** @desc Update contact by ID */
/** @access private
/** @route PUT /api/contacts/:id */
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.send(403);
    throw new Error("Forbidden contact");
  }

  const updatedConact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedConact);
});

/** @desc Remove contact by ID */
/** @access private
/** @route DELETE /api/contacts/:id */
export const removeContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.send(403);
    throw new Error("Forbidden contact");
  }
  await contactModel.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});
