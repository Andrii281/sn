import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { GetUserResponce } from './response/getUserResponse';
import { JwrAuthGuard } from 'src/guards/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createDto);
  }

  @Get()
  findAll(): Promise<GetUserResponce[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwrAuthGuard)
  @Patch()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ): Promise<GetUserResponce> {
    return this.usersService.update(request.user.email, updateUserDto);
  }

  @UseGuards(JwrAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    return this.usersService.delete(request.user.email);
  }
}
