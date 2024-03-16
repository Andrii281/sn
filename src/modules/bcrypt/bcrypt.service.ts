import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(input: string, hash: string): Promise<boolean> {
    return bcrypt.compare(input, hash);
  }
}
