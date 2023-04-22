import {UserRole} from "../models/user-roles";
import * as bcrypt from "bcrypt";

const saltOfRounds : number=Math.random();
export class UserDto {
  id?: string;
  name: string;
  email: string;
  roles: UserRole[];
  password:string;
  constructor(values:Partial<UserDto>){
    if (values){
      this.id=values.id;
      this.email=values.email;
      this.name=values.name;
      this.roles=values.roles;
      this.password=bcrypt.hash(values.password,saltOfRounds);
    }
  }
}
