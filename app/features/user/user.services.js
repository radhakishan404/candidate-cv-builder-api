import userSchema from "../../models/user.model.js";

const readUser = async (
    find = {},
    select = {},
    sort = {},
    page = 0,
    limit = 10,
) => {
    try {
        const result = await userSchema
            .find(find)
            .select(select)
            .sort(sort)
            .skip(page * limit)
            .limit(limit);

        const count = await userSchema.countDocuments(find);

        return {result, count};
    } catch (error) {
        throw new Error(error);
    }
};

const createUser = async (userData) => {
    try {
        const result = new userSchema(userData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}

const readUserSingle = async (filter, select = {}) => {
    try {
        const result = await userSchema.findOne(filter).select(select).lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    readUser,
    createUser,
    readUserSingle,
}