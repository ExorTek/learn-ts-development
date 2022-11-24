import {ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {LoginDto, RegisterDto} from "./dto";
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) {
    }

     async register(registerDto: RegisterDto) {
        const {email, password, firstName, lastName} = registerDto;
        const isUserExist = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (isUserExist) return new ForbiddenException('Please check your email and password!');
        const hashedPassword = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstName ?? '',
                lastName: lastName ?? '',
            }
        })
        return await this.signToken(user.id);
    }

    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user) return new ForbiddenException('Please check your email and password!');
        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) return new ForbiddenException('Please check your email and password!');
        return await this.signToken(user.id);
    }

    async signToken(userId: string): Promise<{ token: string }> {
        const [expiresIn, secret] = [this.config.get('JWT_EXPIRES_IN'), this.config.get('JWT_SECRET')];
        const payload = {
            sub: userId
        };
        const options = {
            expiresIn,
            secret,
        };
        const token = await this.jwtService.signAsync(payload, options);
        return {
            token,
        }
    }

}