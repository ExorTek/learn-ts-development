import {ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateBookmarkDto, EditBookmarkDto} from "./dto";

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {
    }

    async getBookmarks(userId: string) {
        return await this.prisma.bookmark.findMany({
            where: {
                userId
            },
        });
    }

    async getBookmark(userId: string, bookmarkId: number) {
        return await this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId,
            },
        });
    }

    async createBookmark(userId: string, createBookmarkDto: CreateBookmarkDto) {
        return await this.prisma.bookmark.create({
            data: {
                userId,
                title: createBookmarkDto.title,
                url: createBookmarkDto.url,
                description: createBookmarkDto.description ?? '',
            },
        });
    }

    async updateBookmark(userId: string, bookmarkId: number, editBookmarkDto: EditBookmarkDto) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            },
        });
        if (!bookmark || bookmark.userId !== userId) throw new ForbiddenException('You are not allowed to edit this bookmark!');
        return await this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...editBookmarkDto,
            },
        });
    }

    async deleteBookmark(userId: string, bookmarkId: number) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            },
        });
        if (!bookmark || bookmark.userId !== userId) throw new ForbiddenException('You are not allowed to edit this bookmark!');
        return await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            },
        });
    }
}
