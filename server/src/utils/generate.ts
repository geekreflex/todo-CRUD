import jwt from 'jsonwebtoken';
import debug from 'debug';

const log: debug.IDebugger = debug('generate-utils');

const jwtSecret: any = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;

export const generateToken = async (id: string) => {
  try {
    const token = jwt.sign({ id }, jwtSecret, {
      expiresIn: tokenExpirationInSeconds,
    });
    return token;
  } catch (error) {
    log('generateToken error: %0', error);
  }
};
