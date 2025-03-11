import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const accessToken = jwt.sign({ id: user.id, email: user.email, role:user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    user,
    accessToken,
  };
}

export const AuthService = {
    loginUser
}