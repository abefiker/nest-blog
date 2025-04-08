import { IsString, IsNotEmpty } from 'class-validator'
export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    @IsNotEmpty()
    content: string
    @IsNotEmpty()
    @IsString()
    author: string
}
