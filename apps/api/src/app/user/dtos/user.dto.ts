import { UserRole } from '../models/user-roles';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Automatically generated, its the ID of the user',
    example: 'A string that is going to be automatically generated',
    required: true,
  })
  id?: string;
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Snow',
    required: true,
  })
  name: string;
  @ApiProperty({
    description: 'The e-mail of the user. A valid e-mail as well.',
    example: 'JohnSnow@Kingslanding.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'The Role of the user',
    example: 'USER or ADMIN',
    required: true,
  })
  roles: UserRole[];
  @ApiProperty({
    description: 'The Password of the user',
    example: 'TheUnbeatableUnknownPassword',
    required: true,
  })
  password: string;

  constructor(values: Partial<UserDto>) {
    if (values) {
      this.id = values.id;
      this.email = values.email;
      this.name = values.name;
      this.roles = values.roles;
    }
  }
}
