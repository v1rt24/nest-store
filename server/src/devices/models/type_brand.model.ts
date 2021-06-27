import {Column, Model, Table, DataType, ForeignKey} from 'sequelize-typescript';
import {Type} from './type.model';
import {Brand} from './brand.model';

@Table
export class TypeBrand extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Type)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    type_id: number;

    @ForeignKey(() => Brand)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    brand_id: number;
}