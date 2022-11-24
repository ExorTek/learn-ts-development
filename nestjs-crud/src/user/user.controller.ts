import {Body, Controller, Get, Put, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guard";
import {GetUserDecorator} from "../auth/decorator";
import {User} from "@prisma/client";
import {EditUserDto} from "./dto";
import {UserService} from "./user.service";

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('/me')
    getMe(@GetUserDecorator('') user: User) {
        return user;
    }

    @Put('/')
    editMe(@GetUserDecorator('id') userId: string, @Body() editUserDto: EditUserDto) {
        return this.userService.editUser(userId, editUserDto);
    }

}
