import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
    getHello(): object {
        return { message: 'Hello World!' };
    }
}