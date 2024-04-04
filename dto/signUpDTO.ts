import { IsString, MinLength, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    lastName?:string

    constructor(firstName: string, email: string, password: string,lastName?: string) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.lastName = lastName
    }
}
