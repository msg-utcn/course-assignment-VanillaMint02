import {ApiProperty} from "@nestjs/swagger";
import {UserRole} from "../models/user-roles";
export class RegisterUserDto{
  @ApiProperty({
    description : 'My name',
    example : 'John Snow',
    required: true,
  })
  name : string;
  @ApiProperty({
    description : 'e-mail where I can be contacted',
    example : 'JohnSnow@Kingslanding.com',
    required : true,
  })
  email:string;
  @ApiProperty({
    description : 'What is my role in all this?',
    example : 'USER,ADMIN',
  })
  roles:UserRole[];

  @ApiProperty({
    description :"Password needed",
    example : "TheUnbreakableUndefeatableUnfathomablePassword01",
  }) password : string;
}
