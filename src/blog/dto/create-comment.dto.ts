import { IsString } from "class-validator";
export class CreateCommentDto{
    @IsString()
    username:string
    @IsString()
    text:string
}