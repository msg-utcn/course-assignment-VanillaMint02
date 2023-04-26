import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserConfig } from './user.config';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(UserConfig.SWAGGER_FEATURE)
@Controller(UserConfig.API_ROUTE)
export class UserController {
  constructor(private usersService: UserService) {}
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }
}
