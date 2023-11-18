import Contact from "../models/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res) => {
   const result = await Contact.find();
   res.json(result);
};

const getById = async (req, res) => {
   const { contactId: id } = req.params;
   const result = await Contact.findById(id);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

const add = async (req, res) => {
   const result = await Contact.create(req.body);
   res.status(201).json(result);
};

const remove = async (req, res) => {
   const { contactId: id } = req.params;
   const result = await Contact.findByIdAndDelete(id);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
   const { contactId: id } = req.params;
   const result = await Contact.findByIdAndUpdate(id, req.body);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

const updateContactStatus = async (req, res) => {
   const { contactId: id } = req.params;
   const result = await Contact.findByIdAndUpdate(id, req.body);
   if (!result) {
      throw HttpError(404, `Not found`);
   }
   const updatedContact = await Contact.findById(id);
   res.json(updatedContact);
};

export default {
   getAll: ctrlWrapper(getAll),
   getById: ctrlWrapper(getById),
   add: ctrlWrapper(add),
   remove: ctrlWrapper(remove),
   updateById: ctrlWrapper(updateById),
   updateContactStatus: ctrlWrapper(updateContactStatus),
};
