import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Device} from './models/device.model';
import {DeviceInfo} from './models/device-info.model';
import {Type} from './models/type.model';
import {Brand} from './models/brand.model';
import {CreateDeviceDto} from './dto/create-device.dto';
import {FileType, FileLoad} from './fileHandler';

@Injectable()
export class DevicesService {
    constructor(
        @InjectModel(Device)
        private readonly deviceModel: typeof Device,
        @InjectModel(Type)
        private readonly typeModel: typeof Type,
        @InjectModel(Brand)
        private readonly brandModel: typeof Brand,
    ) {
    }

    // ============= Бренды
    async createBrand(dto): Promise<Brand> {
        try {
            return await this.brandModel.create(dto);
        } catch (error) {
            console.log(error);

            if (error.original.errno === 1062) {
                error = 'Такой Бренд уже существует';
            }

            throw new HttpException({
                statusCode: 400,
                message: error,
                codeError: 'BrandDuplicate',
            }, 400);
        }
    }

    async getAllBrands(): Promise<Brand[]> {
        try {
            return await this.brandModel.findAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // ============= Типы
    async createType(dto): Promise<Type> {
        try {
            return await this.typeModel.create(dto);
        } catch (error) {
            console.log(error);

            if (error.original.errno === 1062) {
                error = 'Такой Тип уже существует';
            }

            throw new HttpException({
                statusCode: 400,
                message: error,
                codeError: 'TypeDuplicate',
            }, 400);
        }
    }

    async getAllTypes(): Promise<Type[]> {
        try {
            return await this.typeModel.findAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // ============= Товары
    async createDevice(dto: CreateDeviceDto, img): Promise<Device> {
        try {
            const pathImg = FileLoad(FileType.IMAGES, img);
            const {name, price, type_id, brand_id, info} = dto;

            const device = await this.deviceModel.create({name, price, type_id, brand_id, img: pathImg});

            // Характеристики товара
            if (info) {
                const arrInfo = JSON.parse(info);
                for (const item of arrInfo) {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        device_id: device.id,
                    });
                }
            }
            // /Характеристики товара

            return device;
        } catch (error) {
            console.log(error);

            if (error.original.errno === 1062) {
                error = 'Такой Товар уже существует';
            }

            throw new HttpException({
                statusCode: 400,
                message: error,
                codeError: 'DeviceDuplicate',
            }, 400);
        }
    }

    async getAllDevices(type_id: string, brand_id: string, page, limit): Promise<Device[]> {
        try {
            let device = null;

            const offset = page * limit - limit;

            if (!type_id && !brand_id) {
                device = await this.deviceModel.findAndCountAll({
                    include: {all: true},
                    offset,
                    limit,
                });
            }

            if (type_id && !brand_id) {
                device = await this.deviceModel.findAndCountAll({
                    where: {type_id},
                    include: {all: true},
                    offset,
                    limit,
                });
            }

            if (!type_id && brand_id) {
                device = await this.deviceModel.findAndCountAll({
                    where: {brand_id},
                    include: {all: true},
                    offset,
                    limit,
                });
            }

            if (type_id && brand_id) {
                device = await this.deviceModel.findAll({
                    where: {type_id, brand_id},
                    include: {all: true},
                    offset,
                    limit,
                });
            }

            return device;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getOneDevice(name: string): Promise<Device> {
        try {
            const device = await this.deviceModel.findOne({
                where: {name},
                include: [DeviceInfo],
            });

            if (!device) {
                throw 'Товар не найден';
            }

            return device;
        } catch (error) {
            console.log(error);
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'DeviceNotFound',
            }, 404);
        }
    }
}
