import Joi from "joi";

export const userAddV = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required().max(15),
    professional_title: Joi.string().required(),
    short_information: Joi.string().required(),
    image: Joi.allow(),
    github_url: Joi.allow(),
    linkedin_url: Joi.allow(),
    company: Joi.string().required(),
    years: Joi.allow(),
    company_address: Joi.string(),
    experience: Joi.string().required(),
    skills: Joi.string().required(),
});

export const userListV = Joi.object({
    page: Joi.string().allow(),
    perPage: Joi.string().allow(),
    sortField: Joi.string().allow(),
    sortBy: Joi.string().allow(),
    search: Joi.string().optional().allow('')
});