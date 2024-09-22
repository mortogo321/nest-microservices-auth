import * as argon2 from "argon2";


export async function hash(str: string): Promise<string> {
  return await argon2.hash(str);
}
