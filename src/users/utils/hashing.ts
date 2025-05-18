import * as bcrypt from 'bcrypt';

export async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function isMatch(
  plainPassword: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hash);
}
