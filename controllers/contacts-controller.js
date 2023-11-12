import * as contactsService from "../models/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
   const result = await contactsService.listContacts();
   res.json(result);
};

const getById = async (req, res, next) => {
   const { contactId: id } = req.params;
   const result = await contactsService.getContactById(id);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

const add = async (req, res, next) => {
   const result = await contactsService.addContact(req.body);
   res.status(201).json(result);
};

const remove = async (req, res, next) => {
   const { contactId: id } = req.params;
   const result = await contactsService.removeContact(id);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
   const { contactId: id } = req.params;
   const result = await contactsService.updateContact(id, req.body);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

export default {
   getAll: ctrlWrapper(getAll),
   getById: ctrlWrapper(getById),
   add: ctrlWrapper(add),
   remove: ctrlWrapper(remove),
   updateById: ctrlWrapper(updateById),
};
