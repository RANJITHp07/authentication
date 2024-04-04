import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

// to check the request body in login
export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;


    constructor( email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
