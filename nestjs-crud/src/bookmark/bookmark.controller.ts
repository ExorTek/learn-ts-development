import {Controller, Get, Put, Post, Delete, Param, ParseIntPipe, Body, UseGuards} from '@nestjs/common';
import {BookmarkService} from "./bookmark.service";
import {GetUserDecorator} from "../auth/decorator";
import {CreateBookmarkDto, EditBookmarkDto} from "./dto";
import {JwtGuard} from "../auth/guard";

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {
    }

    @Get('/')
    getBookmarks(@GetUserDecorator('id') userId: string) {
        return this.bookmarkService.getBookmarks(
            userId
        );
    }

    @Get('/:id')
    getBookmark(@GetUserDecorator('id') userId: string, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmark(
            userId,
            bookmarkId
        );
    }

    @Post('/')
    createBookmark(@GetUserDecorator('id') userId: string, @Body() createBookmarkDto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(
            userId,
            createBookmarkDto
        );
    }

    @Put('/:id')
    updateBookmark(@GetUserDecorator('id') userId: string, @Param('id', ParseIntPipe) bookmarkId: number, @Body() editBookmarkDto: EditBookmarkDto) {
        return this.bookmarkService.updateBookmark(
            userId,
            bookmarkId,
            editBookmarkDto
        );
    }

    @Delete('/:id')
    deleteBookmark(@GetUserDecorator('id') userId: string, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmark(
            userId,
            bookmarkId
        );
    }
}
