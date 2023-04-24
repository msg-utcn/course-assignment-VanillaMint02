import { ApiTags } from '@nestjs/swagger';
import { UserConfig } from './user.config';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@ApiTags(UserConfig.SWAGGER_FEATURE)
@Controller(UserConfig.API_ROUTE)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get('email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.getUserById(email);
  }

  @Get('id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  async registerUser(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }
}
