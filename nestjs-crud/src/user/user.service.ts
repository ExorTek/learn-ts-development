import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {EditUserDto} from "./dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async editUser(userId: string, dto: EditUserDto) {
        Object.keys(dto).forEach(key => {
            if (dto[key] === undefined) {
                delete dto[key];
            }
        });
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        })
        const updatedUser = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto
            }
        })
        delete updatedUser.password;
        return updatedUser;
    }
}
