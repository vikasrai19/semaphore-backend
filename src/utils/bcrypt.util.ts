import * as bcrypt from 'bcrypt';

export class BcryptUtil {
  saltOrRounds: number = 32;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async matchPassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}
