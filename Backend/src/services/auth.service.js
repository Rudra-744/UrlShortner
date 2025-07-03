import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { ConflictError, NotFoundError, UnauthorizedError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcrypt";        

export const registerUser = async (name, email, password) => { 
    const user = await findUserByEmail(email);
    if (user) throw new ConflictError("User already exists");

    const newUser = await createUser(name, email, password);
    const token = signToken({ id: newUser.id });
    return token;
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new UnauthorizedError("Invalid email or password");

    const token = signToken({ id: user._id });
    return { token, user };
}
