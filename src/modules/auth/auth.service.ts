import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { loginUserDto } from './dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
// import { User } from '../users/model';
import { AuthUserResponse } from './response/authUserResponse';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly bcryptService: BcryptService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<AuthUserResponse> {
    if (await this.usersService.findByEmail(dto.email))
      throw new BadRequestException('user with this email exist already');
    const newUser = await this.usersService.create(dto);
    const token = await this.tokenService.generateJwtToken({
      email: newUser.email,
      name: newUser.firstName,
    });
    return plainToClass(AuthUserResponse, { ...newUser, token });
  }

  async login(dto: loginUserDto): Promise<string> {
    const existUser = await this.usersService.findByEmail(dto.email);
    if (!existUser) throw new BadRequestException('this email not exist');
    const validatePassword = await this.bcryptService.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException('password is wrong');
    const token = await this.tokenService.generateJwtToken({
      email: existUser.email,
      name: existUser.firstName,
    });
    return token;
  }
}
