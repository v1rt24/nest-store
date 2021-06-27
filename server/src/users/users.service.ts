import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {Basket} from './models/basket.model';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';

import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Basket)
        private readonly basketModel: typeof Basket,
        private readonly jwtService: JwtService,
    ) {
    }

    // Регистрация пользователя
    async register(dto: CreateUserDto): Promise<{ token: string }> {
        try {
            const hashPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.userModel.create({...dto, password: hashPassword});
            await this.basketModel.create({user_id: user.id});
            return this.generateToken(user);
        } catch (error) {
            if (error.original.errno === 1062) {
                throw new HttpException({
                    statusCode: 400,
                    message: 'Такая почта уже существует',
                    codeError: 'UserRegisterDuplicate',
                }, 400);
            }
        }
    }

    // Авторизация пользователя
    async login(dto: LoginUserDto): Promise<{ token: string }> {
        try {
            const user = await this.userModel.findOne({where: {email: dto.email}});

            if (!user) {
                throw 'Логин / Пароль не верны';
            }

            const passwordCompare = await bcrypt.compare(dto.password, user.password);

            if (!passwordCompare) {
                throw 'Логин / Пароль не верны';
            }

            return this.generateToken(user);
        } catch (error) {
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'UserLoginNotFound',
            }, 404);
        }
    }

    // Проверка авторизации пользователя
    async auth() {
    }

    // Создание JWT токена
    private generateToken(user: User): { token: string } {
        const payload = {id: user.id, email: user.email, role: user.role};
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
