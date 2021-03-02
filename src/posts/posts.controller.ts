import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostsService } from './posts.service';
import { FindOneParams } from '../utils/findOneParams';
import { RequestWithUser } from '../auth/dto/requestWithUser.interface';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param() { id }: FindOneParams) {
    return this.postsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @Put(':id')
  async update(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    this.postsService.delete(id);
  }
}
