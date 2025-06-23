import { userModel } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const registerUser = async ({
  username,
  email,
  password,
  role,
  baseId,
}) => {
  password = await bcrypt.hash(password, 10);
  const newUser = userModel.create({ username, password, email, role, baseId });
  return await newUser.save();
};

const loginUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role, baseId: user.baseId },
    config.jwtSecret,
    { expiresIn: config.jwtExpire }
  );
  return {
    token,
    username: user.username,
    role: user.role,
    baseId: user.baseId,
  };
};

export default { registerUser, loginUser};