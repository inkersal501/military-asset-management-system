import { userService } from "../services/index.js";

const signup = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = await userService.loginUser(req.body);
    res.json(userData);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default { signup, login };
