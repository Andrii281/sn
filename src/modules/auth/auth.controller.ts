import {
  Body,
  Controller,
  Post,
  // SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto';
import { JwrAuthGuard } from 'src/guards/jwt-auth-guard';
// import { TransformInterceptor } from 'src/common/interceptors/transform';

@Controller('auth')
// @SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: loginUserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwrAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
