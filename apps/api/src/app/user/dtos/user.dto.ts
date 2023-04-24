import { UserRole } from '../models/user-roles';

export class UserDto {
  id?: string;
  name: string;
  email: string;
  roles: UserRole[];
  password: string;

  constructor(values: Partial<UserDto>) {
    if (values) {
      this.id = values.id;
      this.email = values.email;
      this.name = values.name;
      this.roles = values.roles;
      this.password = values.password;
    }
  }
}
