import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserModel } from '../models/user.model';
import { UserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

const saltOfRounds: number = Math.random();

export class UserMapper {
  static mapCreateUserToModel(dto: RegisterUserDto): UserModel {
    return new UserModel({
      id: undefined,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  static mapToDto(model: UserModel): UserDto {
    return new UserDto({
      id: model.id,
      name: model.name,
      email: model.email,
      roles: model.roles,
      password: bcrypt.hash(model.password, saltOfRounds),
    });
  }
}
