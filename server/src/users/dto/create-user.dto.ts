import {IsEmail, IsString, MinLength, IsEnum, IsOptional} from 'class-validator';
import {Role} from '../models/user.model';

export class CreateUserDto {
    @IsEmail({}, {message: 'Некорректная почта'})
    readonly email: string;

    @IsString({message: 'Пароль должен быть строкой'})
    @MinLength(6, {message: 'Пароль должен быть не менее 6 символов'})
    readonly password: string;

    @IsOptional()
    @IsEnum(Role)
    readonly role?: Role;
}