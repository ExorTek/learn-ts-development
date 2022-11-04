import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/')
export class HelloWorldController {
    @Get()
   getHello(@Req() request: Request): object {
        return { message: 'Hello World!' };
    }
}