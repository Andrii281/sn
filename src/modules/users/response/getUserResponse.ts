import { Exclude } from 'class-transformer';

export class GetUserResponce {
  firstName: string;
  secondName: string;
  email: string;
  @Exclude()
  password: string;
}
