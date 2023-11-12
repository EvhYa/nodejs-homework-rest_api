import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import { contactSchema, updContactSchema } from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, validateBody(contactSchema), contactsController.add);

router.delete("/:contactId", contactsController.remove);

router.put("/:contactId", isEmptyBody, validateBody(updContactSchema), contactsController.updateById);

export default router;
