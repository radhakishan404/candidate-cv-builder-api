import constants from "../../config/constants.js";
import { responseSend } from "../../helpers/responseSend.js";
import { candidateTemplate, footerTemplate, headerTemplate } from "../../templates/condidateTemplate.js";
import { createListenPdf } from "../../utils/puppeteer.js";
import { createUser, readUser, readUserSingle } from "./user.services.js";

const select_user_details = ["id", "name", "email", "phone", "profile", "professional_title", "short_information", "address", "company", "year", "company_address", "is_active", "experience", "skills", "github_url", "linkedin_url", "createdAt"];

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const condition = { _id: id, is_active: true };
        const checkUser = await readUserSingle(condition, select_user_details);
        if (!checkUser) throw new Error("User does not exists");

        responseSend(res, 201, "User Fetched Successfully", checkUser);
    } catch (error) {
        next(error);
    }
};

const addUser = async (req, res, next) => {
    try {
        console.log(req.body)
        let payload = {
            ...req.body,
            profile: constants.BASE_URL + req.body.image.path,
            experience: req.body.experience.split(","),
            skills: req.body.skills.split(","),
        }
        delete payload.image;
        const userData = await createUser(payload);
        if (!userData) throw new Error("Something went wrong while register");

        let html = candidateTemplate(userData);
        let header = headerTemplate(userData);
        let footer = footerTemplate(userData);

        await createListenPdf(html, header, footer, userData._id);

        responseSend(res, 201, "User Created Successfully", userData);
    } catch (error) {
        next(error);
    }
};

const listUser = async (req, res, next) => {
    try {
        let where = { is_active: true };

        let page = req.query.page || 0;
        let perPage = req.query.perPage || 10;
        let sortField = req.query.sortField || "createdAt";
        let sortBy = req.query.sortBy || "DESC";

        if (req.query.search) {
            where = {
                ...where,
                $or: [
                    { name: { $regex: '.*' + req.query.search + '.*' } },
                    { email: { $regex: '.*' + req.query.search + '.*' } },
                    { phone: { $regex: '.*' + req.query.search + '.*' } },
                    { company: { $regex: '.*' + req.query.search + '.*' } },
                ]
            }
        }

        const userData = await readUser(where, select_user_details, { [sortField]: sortBy }, page, perPage);

        responseSend(res, 201, "User Data Fetched Successfully", userData.result, userData.count);
    } catch (error) {
        next(error);
    }
}

export {
    getUser,
    addUser,
    listUser,
}