import {IsEmail, IsNotEmpty} from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, {message: 'Некорректная почта'})
    readonly email: string;

    @IsNotEmpty({message: 'Введите пароль'})
    readonly password: string;
}