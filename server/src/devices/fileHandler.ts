import * as path from 'path';
import * as fs from 'fs';

// Для создания папок в файловой системе куда будут загружаться файлы
export enum FileType {
    AUDIO = 'audio',
    IMAGES = 'images'
}

// Для создания файла в файловой системе
export const FileLoad = (type: FileType, file) => {
    try {
        // получаем расширение файла
        const extensionFile = file.originalname.slice(file.originalname.lastIndexOf('.'));

        // Делаем уникальное название загружаемому файлу
        const fileName = Date.now().toString() + extensionFile;

        // Формируем путь для сохранения файлов
        const pathFile = path.resolve(__dirname, '..', 'static', type);

        // Проверяем существует ли путь для сохранения файлов, если нет, то создаём
        if (!fs.existsSync(pathFile)) {
            fs.mkdirSync(pathFile, {recursive: true});
        }

        // Создаём и помещаем файл по созданному пути
        fs.writeFileSync(path.resolve(pathFile, fileName), file.buffer);

        // Возвращаем путь к файлу для записи в БД
        return `${type}/${fileName}`;
    } catch (error) {
        throw error;
    }
};

// Для удаления файла из файловой системы
export const RemoveFile = (type: FileType, file) => {
};
