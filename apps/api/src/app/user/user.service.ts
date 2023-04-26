import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from './models/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { UserMapper } from './mappers/user.mapper';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { compare, hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from './user.config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const foundModels = await this.userModelRepository.find();
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => UserMapper.mapToDto(model));
  }

  async getUserById(id: string): Promise<UserDto> {
    const foundModel = await this.readUserModelById(id);
    return UserMapper.mapToDto(foundModel);
  }

  async create(dto: RegisterUserDto): Promise<UserDto> {
    const password = dto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const model = UserMapper.mapRegisterDtoToModel(dto, hashedPassword);
    const savedModel = await this.userModelRepository.save(model);
    return UserMapper.mapToDto(savedModel);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const foundModel = await this.readUserModelByEmail(email);
    return UserMapper.mapToDto(foundModel);
  }

  private async readUserModelById(id: string): Promise<UserModel> {
    const foundModel = await this.userModelRepository.findOne({
      where: { id },
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }

  private async readUserModelByEmail(email: string): Promise<UserModel> {
    const foundModel = await this.userModelRepository.findOne({
      where: { email },
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
  async checkCredentials(loginUserDto: LoginUserDto): Promise<boolean> {
    const foundModel = await this.userModelRepository.findOneBy({
      email: loginUserDto.email,
    });
    if (!foundModel) {
      return false;
    }
    return compare(loginUserDto.password, foundModel.password);
  }
}
