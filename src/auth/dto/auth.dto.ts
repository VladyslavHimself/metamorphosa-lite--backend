import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({example: 'dmytroframe@gmail.com', description: "This Email"})
    @IsString()
    email: string

    @ApiProperty({example: '123567', description: "User password back in hash"})
    @IsString()
    password: string
}