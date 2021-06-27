import {Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {Type} from './type.model';
import {Brand} from './brand.model';
import {DeviceInfo} from './device-info.model';
import {BasketDevice} from '../../users/models/basket-device.model';
import {Rating} from '../../ratings/models/rating.model';

@Table
export class Device extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @Column({type: DataType.INTEGER.UNSIGNED, defaultValue: 0})
    rating: number;

    // Связь один ко многим с таблицей "type.model.ts"
    @ForeignKey(() => Type)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    type_id: number;

    @BelongsTo(() => Type)
    type: Type;

    // Связь один ко многим с таблицей "device-info.model.ts"
    @HasMany(() => DeviceInfo)
    deviceInfos: DeviceInfo[];

    // Связь один ко многим с таблицей "brand.model.ts"
    @ForeignKey(() => Brand)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    brand_id: number;

    @BelongsTo(() => Brand)
    brand: Brand;

    // Связь один ко многим с таблицей "basket-device.model.ts"
    @HasMany(() => BasketDevice)
    basketDevices: BasketDevice[];

    // Связь один ко многим с таблицей "rating.model"
    @HasMany(() => Rating)
    ratings: Rating[];
}