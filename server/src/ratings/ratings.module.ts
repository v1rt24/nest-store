import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Rating} from './models/rating.model';
import {RatingsController} from './ratings.controller';
import {RatingsService} from './ratings.service';

@Module({
    imports: [SequelizeModule.forFeature([Rating])],
    controllers: [RatingsController],
    providers: [RatingsService],
})
export class RatingsModule {
}
