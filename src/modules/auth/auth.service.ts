import AppError from '@/errors/AppError';
import format from 'date-fns/format';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import User from '../user/user.model';
import TUser from '../user/user.types';
import { comparePassword, createJWT, hashPassword } from './auth.utils';

export const registerUserToDb = async (payload: Omit<TUser, '_id'>) => {
  const { username, email } = payload;

  // check user is already registered or not
  const isExist = await User.findOne({ $or: [{ username }, { email }] });
  if (isExist) {
    throw new AppError(BAD_REQUEST, 'The User already exists by username or email');
  }

  // Now create the user
  const user = await new User(payload).save();
  const newUser = user.toObject() as Partial<TUser>;
  delete newUser.password;
  delete newUser.passwordHistories;
  delete newUser.passwordUpdatedAt;
  delete newUser.__v;
  return newUser;
};

export const loginUserFromDb = async (payload: Pick<TUser, 'username' | 'password'>) => {
  const { username, password } = payload;

  // check the user found or not
  const user = await User.findOne({ username }).select('+password');
  if (!user?._id) {
    throw new AppError(NOT_FOUND, 'User not found with the username');
  }

  // check the user password
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new AppError(BAD_REQUEST, 'Password is not valid');
  }

  // create jwt token
  const token = createJWT({ email: user.email, _id: user.id, role: user.role });

  // ready user response
  const userResponse = user.toObject() as Partial<TUser>;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;
  delete userResponse.__v;
  delete userResponse.password;
  delete userResponse.passwordHistories;
  delete userResponse.passwordUpdatedAt;

  return {
    token,
    user: userResponse,
  };
};

export const changePasswordToDb = async (userId: string, payload: Record<string, string>) => {
  const { currentPassword, newPassword } = payload;
  const user = await User.findById(userId).select(
    '+password +passwordHistories +passwordUpdatedAt',
  );

  if (!user) {
    throw new AppError(NOT_FOUND, 'User not found');
  }

  // check currentPassword
  const isValid = await comparePassword(currentPassword, user?.password);
  if (!isValid) {
    throw new AppError(BAD_REQUEST, 'Current password is not matched');
  }
  let { passwordHistories } = user;

  if (currentPassword.trim() === newPassword.trim()) {
    const date = format(new Date(user.passwordUpdatedAt || user.createdAt!), 'yyyy-MM-dd hh:mm a');
    throw new AppError(
      BAD_REQUEST,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${date}).`,
      null,
    );
  }
  if (passwordHistories?.length) {
    const comparePasswordPromise = passwordHistories.map((history) => {
      return comparePassword(newPassword.trim(), history.password);
    });
    const booleans = await Promise.all(comparePasswordPromise);
    if (booleans.includes(true)) {
      const date = format(
        new Date(passwordHistories[booleans.indexOf(true)].updatedAt!),
        'yyyy-MM-dd hh:mm a',
      );
      throw new AppError(
        BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${date}).`,
        null,
      );
    }
  }

  // hash password
  const hashedPassword = await hashPassword(newPassword);

  if (!passwordHistories) {
    passwordHistories = [];
  } else {
    passwordHistories = [...passwordHistories];
  }

  const passwordHistory = {
    password: user?.password,
    createdAt: user.createdAt,
    updatedAt: new Date(),
  };
  if (passwordHistories.length < 2) {
    passwordHistories.push(passwordHistory);
  } else {
    const temp = passwordHistories[1];
    passwordHistories[0] = temp;
    passwordHistories[1] = passwordHistory;
  }
  const data = await User.findOneAndUpdate(
    { _id: userId },
    {
      password: hashedPassword,
      passwordHistories,
      passwordUpdatedAt: new Date(),
    },
  );
  if (!data) {
    throw new AppError(BAD_REQUEST, 'Password change failed');
  }
  const updatedData = data.toObject() as Partial<TUser>;
  delete updatedData.password;
  delete updatedData.__v;
  delete updatedData.passwordHistories;
  delete updatedData.passwordUpdatedAt;
  return updatedData;
};
