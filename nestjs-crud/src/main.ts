import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

const PORT = 5001;

(async function start() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    return await app.listen(PORT).then(() => console.log(`Server started at http://localhost:${PORT}`)).catch(err => console.log(err));
})();


