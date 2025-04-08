import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) { }
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new this.blogModel(createBlogDto)
    return blog.save()
  }


  async findAll(): Promise<Blog> {
    return this.blogModel.find().exec()
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;

  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
      new: true,
    });
    if (!blog) {
      throw new NotFoundException('Blog not found for update');
    }
    return blog;
  }


  async remove(id: string): Promise<{ message: string }> {
    const result = await this.blogModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException('Blog not found for deleting')
    }
    return { message: 'Blog deleted successfully' }
  }
  async addComment(blogId: string, createCommentDto: CreateCommentDto): Promise<Blog> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(blogId, {
      $push: {
        comments: { ...createCommentDto, created: new Date() }
      }
    }, {
      new: true,
      runValidators: true
    })
    if (!updatedBlog) {
      throw new NotFoundException('Blog not found for commenting')
    }
    return updatedBlog
  }
}
