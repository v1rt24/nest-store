import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Basket} from './basket.model';
import {Device} from '../../devices/models/device.model';

@Table
export class BasketDevice extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    // Связь один к одному с таблицей "device.model.ts"
    @ForeignKey(() => Device)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    device_id: number;

    @BelongsTo(() => Device)
    device: Device;

    // Связь один ко многим с таблицей "basket.model.ts"
    @ForeignKey(() => Basket)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    basket_id: number;

    @BelongsTo(() => Basket)
    basket: Basket;
}