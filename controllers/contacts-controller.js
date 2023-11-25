import Contact from "../models/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res) => {
   const { _id: owner } = req.user;
   const { page = 1, limit = 20, ...filterParams } = req.query;
   const skip = (page - 1) * limit;
   const filter = { owner, ...filterParams };

   const result = await Contact.find(filter, "", { skip, limit }).populate("owner", "email subcription");
   const total = await Contact.countDocuments(filter);
   res.json({
      result,
      total,
   });
};

const getById = async (req, res) => {
   const { contactId: id } = req.params;
   const { _id: owner } = req.user;

   const result = await Contact.findOne({ _id: id, owner });
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

const add = async (req, res) => {
   const { _id: owner } = req.user;
   const result = await Contact.create({ ...req.body, owner });
   res.status(201).json(result);
};

const remove = async (req, res) => {
   const { contactId: id } = req.params;
   const { _id: owner } = req.user;
   const result = await Contact.findOneAndDelete({ _id: id, owner });
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
   const { contactId: id } = req.params;
   const { _id: owner } = req.user;
   const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }
   res.json(result);
};

const updateContactStatus = async (req, res) => {
   const { contactId: id } = req.params;
   const { _id: owner } = req.user;
   const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
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
