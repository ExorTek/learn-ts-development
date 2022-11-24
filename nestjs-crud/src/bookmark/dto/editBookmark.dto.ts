import {IsOptional, IsString} from "class-validator";

export class EditBookmarkDto {
    @IsString({
        message: 'Title must be a string!'
    })
    @IsOptional()
    title?: string;

    @IsString({
        message: 'Description must be a string!'
    })
    @IsOptional()
    description?: string | '';

    @IsString({
        message: 'Url must be a string!'
    })
    @IsOptional()
    url?: string;
}