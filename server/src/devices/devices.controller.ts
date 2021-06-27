import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles, UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {Device} from './models/device.model';
import {Type} from './models/type.model';
import {Brand} from './models/brand.model';
import {DevicesService} from './devices.service';
import {CreateDeviceDto} from './dto/create-device.dto';
import {FileFieldsInterceptor} from '@nestjs/platform-express';

// Для защиты по ролям
import {Roles} from '../users/decorators/role.decorator';
import {RoleGuard} from '../users/guards/role.guard';
// /Для защиты по ролям

@Controller('devices')
export class DevicesController {
    constructor(private readonly deviceService: DevicesService) {
    }

    // ============= Бренды
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Post('brand')
    createBrand(@Body() dto): Promise<Brand> {
        return this.deviceService.createBrand(dto);
    }

    @Get('brands')
    getAllBrands(): Promise<Brand[]> {
        return this.deviceService.getAllBrands();
    }

    // ============= Типы
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Post('type')
    createType(@Body() dto): Promise<Type> {
        return this.deviceService.createType(dto);
    }

    @Get('types')
    getAllTypes(): Promise<Type[]> {
        return this.deviceService.getAllTypes();
    }

    // ============= Товары
    @UsePipes(new ValidationPipe())
    @Post('device')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'img', maxCount: 1},
    ]))
    createDevice(@Body() dto: CreateDeviceDto, @UploadedFiles() files): Promise<Device> {
        const {img} = files;
        return this.deviceService.createDevice(dto, img[0]);
    }

    @Get('devices')
    getAllDevices(
        @Query('typeId') typeId: string,
        @Query('brandId') brandId: string,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ): Promise<Device[]> {
        const pages = +page || 1;
        const limits = +limit || 9;
        return this.deviceService.getAllDevices(typeId, brandId, pages, limits);
    }

    @Get('device/:name')
    getOneDevice(@Param('name') name: string): Promise<Device> {
        return this.deviceService.getOneDevice(name);
    }
}
