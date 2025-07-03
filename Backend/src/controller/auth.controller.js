import bcrypt from "bcrypt";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {token,user} = await registerUser(name, email, hashedPassword);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "Register Success" });       
});

export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const {token,user} = await loginUser(email, password);
  req.user = user;
   res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "Login Success" });
}); 