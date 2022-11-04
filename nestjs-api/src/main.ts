import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const PORT = 5001;

(async function start() {
    const app = await NestFactory.create(AppModule);
    return await app.listen(PORT).then(() => console.log(`Server started at http://localhost:${PORT}`)).catch(err => console.log(err));
})();


