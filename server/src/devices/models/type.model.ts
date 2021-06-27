import {Column, Model, Table, DataType, BelongsToMany, HasMany} from 'sequelize-typescript';
import {Device} from './device.model';
import {Brand} from './brand.model';
import {TypeBrand} from './type_brand.model';

@Table
export class Type extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    // Связь один ко многим с таблицей "device.model.ts"
    @HasMany(() => Device)
    devices: Device[];

    // Связь многие ко многим с таблицей "type_brand.model.ts"
    @BelongsToMany(() => Brand, () => TypeBrand)
    brands: Brand[];
}