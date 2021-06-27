import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {Basket} from './models/basket.model';
import {BasketDevice} from './models/basket-device.model';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
    exports: [JwtModule],
    imports: [
        SequelizeModule.forFeature([User, Basket, BasketDevice]),
        JwtModule.register({
            secret: 'v1rt24',
            signOptions: {expiresIn: '1h'},
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
