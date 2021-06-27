import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './users/models/user.model';
import {Basket} from './users/models/basket.model';
import {BasketDevice} from './users/models/basket-device.model';
import {Device} from './devices/models/device.model';
import {Type} from './devices/models/type.model';
import {Brand} from './devices/models/brand.model';
import {TypeBrand} from './devices/models/type_brand.model';
import {DeviceInfo} from './devices/models/device-info.model';
import {Rating} from './ratings/models/rating.model';

export const ConnectDb = SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_market',
    autoLoadModels: true,
    models: [
        User,
        Basket,
        BasketDevice,
        Device,
        Type,
        Brand,
        TypeBrand,
        DeviceInfo,
        Rating,
    ],
});