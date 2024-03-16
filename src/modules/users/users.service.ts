import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model';
import { CreateUserDto, UpdateUserDto } from './dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { GetUserResponce } from './response/getUserResponse';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly bcryotService: BcryptService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await this.bcryotService.hash(dto.password);
    return this.usersRepository.save(dto);
  }

  async findAll(): Promise<GetUserResponce[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToClass(GetUserResponce, user));
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(email: string, dto: UpdateUserDto): Promise<GetUserResponce> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('email not found');
    await this.usersRepository.update(user.id, dto);
    return plainToClass(GetUserResponce, Object.assign(user, dto));
  }

  async delete(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email }});
    if (!user) throw new BadRequestException('not authorized');
    await this.usersRepository.delete(user.id);
    return true;
  }
}
