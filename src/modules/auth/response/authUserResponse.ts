import { Exclude } from 'class-transformer';

export class AuthUserResponse {
  firstName: string;
  secondName: string;
  email: string;
  @Exclude()
  password: string;
  token: string;
}
