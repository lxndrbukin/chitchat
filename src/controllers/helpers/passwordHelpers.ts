import * as crypto from 'crypto';
import util from 'util';

const scrypt = util.promisify(crypto.scrypt);

export async function createPassword(suppliedPassword: string) {
  const salt = crypto.randomBytes(8).toString('hex');
  const password: any = await scrypt(suppliedPassword, salt, 64);
  return `${password.toString('hex')}.${salt}`;
}

