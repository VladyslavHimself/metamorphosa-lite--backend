import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserBodyDto {
  @ApiProperty({
    example: 'dmytroframe@gmail.com',
    description: 'This User Email',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password back in hash',
  })
  @IsString()
  @MaxLength(32)
  @MinLength(6)
  password!: string;
}
