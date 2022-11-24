import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {BadRequestException, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: {
        id: string;
    }) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: payload.id,
            }
        })
        if(!user) return new BadRequestException('User not found!');
        delete user.password;
        return user;
    }
}
