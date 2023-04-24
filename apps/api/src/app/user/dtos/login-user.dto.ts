import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'your email or username',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'Your password',
    example: 'You know, the one you registered with',
    required: true,
  })
  password: string;
}
