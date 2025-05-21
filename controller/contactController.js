import asyncHandler from "express-async-handler";

import contactModel from "../models/contactModel.js";

/** @desc Get all contacts */
/** @route GET /api/contacts */
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find();
  res.status(200).json(contacts);
});

/** @desc Create new contacts */
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
  });
  res.status(201).json(contact);
});

/** @desc Get contact by ID */
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
/** @route PUT /api/contacts/:id */
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedConact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedConact);
});

/** @desc Remove contact by ID */
/** @route DELETE /api/contacts/:id */
export const removeContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await contactModel.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});
