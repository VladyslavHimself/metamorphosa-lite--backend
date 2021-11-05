import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'dmytroframe@gmail.com',
    description: 'This User Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password back in hash',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
