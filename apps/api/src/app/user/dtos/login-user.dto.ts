import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'your email or username',
    required: true,
  }) email: string;
  @ApiProperty({

  }) password:string;
}
