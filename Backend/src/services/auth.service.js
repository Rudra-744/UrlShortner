import { findUserByEmail, createUser  } from "../dao/user.dao.js";
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
    try {
        const user = await findUserByEmail(email);
        if (!user) throw new NotFoundError("Invalid emails or password");

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) throw new UnauthorizedError("Invalid email or passwords");

        
        const token = signToken({ id: user.id });
        // Remove password before sending user object
        const userObj = user.toObject();
        delete userObj.password;
        return { token, user: userObj };
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
