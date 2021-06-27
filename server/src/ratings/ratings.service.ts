import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Rating} from './models/rating.model';

@Injectable()
export class RatingsService {
    constructor(
        @InjectModel(Rating)
        private readonly ratingModel: typeof Rating,
    ) {
    }
}
