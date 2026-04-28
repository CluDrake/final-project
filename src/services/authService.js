import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

export async function signUp(name, email, password, role = 'member') {
    console.log({ name, email, password, role });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({name, email, password: hashedPassword, role});
    return newUser;
}

export async function logIn(email, password) {
    const error = new Error('Invalid credentials');
    error.status = 401;

    const user = await findUserByEmail(email);
    if (!user) throw error;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw error;

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return { accessToken };
}