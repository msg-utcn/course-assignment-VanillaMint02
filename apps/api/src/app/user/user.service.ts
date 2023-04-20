import {BadRequestException, Injectable, Logger, NotFoundException} from "@nestjs/common";
import {UserModel} from "./models/user.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "./dtos/user.dto";
import {UserMapper} from "./mappers/user.mapper";
import {RegisterUserDto} from "./dtos/register-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userModelRepository: Repository<UserModel>
  ) {
  }

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
    const model = UserMapper.mapCreateUserToModel(dto);
    try {
      const savedModel = await this.userModelRepository.save(model);
      return UserMapper.mapToDto(savedModel);
    } catch (error) {
      Logger.log(error, 'UserService.create');
      throw new BadRequestException();
    }
  }

  private async readUserModelById(id: string): Promise<UserModel> {
    const foundModel = await this.userModelRepository.findOne({
      where: {id},
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
private async readUserModelByEmail(email:string):Promise<UserModel>{
    const foundModel=await this.userModelRepository.findOne({
      where: {email},
    });
    if(!foundModel){
      throw new NotFoundException();
    }
    return foundModel;
  }
    async getUserByEmail(email:string):Promise<UserDto>{
    const foundModel=await this.readUserModelByEmail(email);
    return UserMapper.mapToDto(foundModel);
  }

}





