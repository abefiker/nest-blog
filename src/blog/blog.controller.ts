import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserDocument } from 'src/users/schemas/user-schema';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @UseGuards(JwtAuthGuard)
  @Post()

  create(@GetUser() user: UserDocument, @Body() createBlogDto: CreateBlogDto) {
    console.log('authorized user ', user)
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
  @Post(':id/comments')
  addComment(@Param('id') blogId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.blogService.addComment(blogId, createCommentDto)
  }
}
