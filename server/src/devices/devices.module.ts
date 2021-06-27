import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Device} from './models/device.model';
import {Type} from './models/type.model';
import {Brand} from './models/brand.model';
import {TypeBrand} from './models/type_brand.model';
import {DeviceInfo} from './models/device-info.model';
import {DevicesController} from './devices.controller';
import {DevicesService} from './devices.service';

import {UsersModule} from '../users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Device, Type, Brand, TypeBrand, DeviceInfo]),
        UsersModule,
    ],
    controllers: [DevicesController],
    providers: [DevicesService],
})
export class DevicesModule {
}
