import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/users.model';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
