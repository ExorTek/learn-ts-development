import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDto  {
    @IsEmail({}, {message: 'Check your email!'})
    @IsNotEmpty({message: 'Email is required!'})
    @IsString({message: 'Email must be a string!'})
    email: string;

    @IsNotEmpty({message: 'Password is required!'})
    @IsString({message: 'Password must be a string!'})
    @MinLength(6, {message: 'Password must be at least 6 characters long!'})
    password: string;
}