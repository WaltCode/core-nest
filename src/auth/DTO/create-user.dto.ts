import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password: string
}