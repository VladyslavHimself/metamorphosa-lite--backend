import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExcerciseDto{
    @ApiProperty({example: 'Leg extension', description: "Name for Excercise"})
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({example: 6, description: "Sets", required: false})
    @IsNumber()
    readonly sets: number

    @ApiProperty({example: 12, description: "Reps"})
    @IsNotEmpty()
    @IsNumber()
    readonly reps: number

    @ApiProperty({example: 32, description: "Weight Default 0", required: false})
    @IsNumber()
    readonly weight: number

    @ApiProperty({example: ["Legs", "Biceps", "Back"], description: "Weight Default 0"})
    @IsNotEmpty()
    readonly muscleTypes: string[]
}