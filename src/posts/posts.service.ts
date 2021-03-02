import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostNotFoundException } from './exceptions/postNotFound.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async findById(id: string) {
    const post = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async create(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async update(id: string, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatePost = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });
    if (updatePost) {
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }

  async delete(id: string) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
