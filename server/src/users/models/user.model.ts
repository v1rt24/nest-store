import {Column, Model, Table, DataType, HasOne, HasMany} from 'sequelize-typescript';
import {Basket} from './basket.model';
import {Rating} from '../../ratings/models/rating.model';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

@Table
export class User extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.ENUM(Role.USER, Role.ADMIN), defaultValue: Role.USER, allowNull: false})
    role: Role;

    // Связь один к одному с таблицей "basket.model"
    @HasOne(() => Basket)
    basket: Basket;

    // Связь один ко многим с таблицей "rating.model"
    @HasMany(() => Rating)
    ratings: Rating[];
}