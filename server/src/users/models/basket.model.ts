import {Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {User} from './user.model';
import {BasketDevice} from './basket-device.model';

@Table
export class Basket extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    // Связь один к одному с таблицей "user.model"
    @ForeignKey(() => User)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    // Связь один ко многим с таблицей "basket-device.model.ts"
    @HasMany(() => BasketDevice)
    basketDevices: BasketDevice[];
}