import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isEmptyFavorite, isValidId, authenticate } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import { contactAddSchema, updContactSchema, contactFavoriteSchema } from "../../models/contacts.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, validateBody(contactAddSchema), contactsController.add);

router.delete("/:contactId", isValidId, contactsController.remove);

router.put("/:contactId", isValidId, isEmptyBody, validateBody(updContactSchema), contactsController.updateById);

router.patch("/:contactId/favorite", isValidId, isEmptyFavorite, validateBody(contactFavoriteSchema), contactsController.updateContactStatus);

export default router;
