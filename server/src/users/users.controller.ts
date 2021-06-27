import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {
    }

    // Регистрация пользователя
    @UsePipes(new ValidationPipe())
    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.userService.register(dto);
    }

    // Авторизация пользователя
    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.userService.login(dto);
    }

    // Проверка авторизации пользователя
    @Get('auth')
    auth() {
        return this.userService.auth();
    }
}
