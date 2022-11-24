import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateBookmarkDto {
    @IsString({
        message: 'Title must be a string!'
    })
    @IsNotEmpty({
        message: 'Title is required!'
    })
    title: string;

    @IsString({
        message: 'Description must be a string!'
    })
    @IsOptional()
    description: string | '';

    @IsString({
        message: 'Url must be a string!'
    })
    @IsNotEmpty({
        message: 'Url is required!'
    })
    url: string;
}