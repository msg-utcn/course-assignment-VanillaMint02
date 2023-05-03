import {ApiProperty} from '@nestjs/swagger';
import {UserRole} from "../../user/models/user-roles";

export class JwtPayloadDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  sub: string;

}
