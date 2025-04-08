import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type BlogDocument = HydratedDocument<Blog>
@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    username: string
    @Prop({ required: true })
    text: string
    @Prop({ default: Date.now })
    createdAt: Date
}
@Schema({
    timestamps: true
})
export class Blog {
    @Prop({ required: true })
    title: string
    @Prop({ required: true })
    content: string
    @Prop({ required: true })
    author: string
    @Prop({ type: [Comment], default: [] })
    comments: Comment[]
}
export const BlogSchema = SchemaFactory.createForClass(Blog)