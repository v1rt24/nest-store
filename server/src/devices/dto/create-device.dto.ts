import {IsInt, IsJSON, IsJWT, IsNumber, MinLength} from 'class-validator';

export class CreateDeviceDto {
    @MinLength(3, {message: 'Поле name должно содержать не менее 3 символов'})
    readonly name: string;

    @IsNumber({}, {message: 'Поле price должно быть числом'})
    readonly price: number;

    img: object;

    @IsJSON({message: 'Должна быть JSON строкой'})
    info?: string;

    @IsInt({message: 'Поле type_id должно быть целым числом'})
    readonly type_id: number;

    @IsInt({message: 'Поле brand_id должно быть целым числом'})
    readonly brand_id: number;
}