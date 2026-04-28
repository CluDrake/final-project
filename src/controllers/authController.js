import { signUp, logIn } from "../services/authService.js";

export async function signUpHandler(req, res){
  try {
  const {name, email, password, role} = req.body;
    // Validation for user input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
  const newUser = await signUp(name, email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
// This code was recycled from a previous project in class.
export async function logInHandler(req, res){
    try {
        const {email, password} = req.body;
        const accessToken = await logIn(email, password);
        res.status(200).json(accessToken);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}