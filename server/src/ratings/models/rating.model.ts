import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from '../../users/models/user.model';
import {Device} from '../../devices/models/device.model';

@Table
export class Rating extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
    rate: number;

    // Связь один ко многим с таблицей "user.model"
    @ForeignKey(() => User)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    // Связь один ко многим с таблицей "device.model"
    @ForeignKey(() => Device)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    device_id: number;

    @BelongsTo(() => Device)
    device: Device;
}