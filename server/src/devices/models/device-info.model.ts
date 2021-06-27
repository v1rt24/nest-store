import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Device} from './device.model';

@Table
export class DeviceInfo extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, allowNull: null})
    description: string;

    // Связь один ко многим с таблицей "device.model.ts"
    @ForeignKey(() => Device)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    device_id: number;

    @BelongsTo(() => Device)
    device: Device;
}