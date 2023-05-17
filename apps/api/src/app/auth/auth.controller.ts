import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from '../user/dtos/register-user.dto';
import { UserDto } from '../user/dtos/user.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { UserService } from '../user/user.service';

@ApiTags(AuthConfig.SWAGGER_FEATURE)
@Controller(AuthConfig.API_ROUTE)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService
  ) {}

  @Post('login')
  @ApiOkResponse({
    description: 'The Jwt Access Token',
    type: JwtTokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req): Promise<JwtTokenDto> {
    return this.authService.login(req.user);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  @ApiBody({ type: RegisterUserDto })
  async registerUser(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }
}
