import {Module} from '@nestjs/common';
import {ConnectDb} from './connectDb';
import {UsersModule} from './users/users.module';
import {DevicesModule} from './devices/devices.module';
import {RatingsModule} from './ratings/ratings.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
    imports: [
        ConnectDb,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
        }),
        UsersModule,
        DevicesModule,
        RatingsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
