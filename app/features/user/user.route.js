import express from "express";
import reqValidator from "../../middlewares/req.validator.js";

import { userAddV, userListV } from "./user.validator.js";
import { addUser, listUser, getUser } from "./user.controller.js";
import { imageProcessingProfilePic } from "../../middlewares/image.processing.js";

const router = express.Router();

router.get(
    "/users",
    reqValidator(userListV),
    (req, res, next) => {
        listUser(req, res, next);
    }
)

router.post(
    "/users",
    imageProcessingProfilePic,
    reqValidator(userAddV),
    (req, res, next) => {
        addUser(req, res, next);
    }
)

router.get(
    "/users/:id",
    (req, res, next) => {
        getUser(req, res, next);
    }
)


export default router;