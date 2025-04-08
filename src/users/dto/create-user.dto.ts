import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsEmail()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
}
