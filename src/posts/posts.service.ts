import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataPostInput } from './dto/data-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async createPost(data: DataPostInput): Promise<Post> {
    const newPost = this.postsRepository.create(data);
    return await this.postsRepository.save(newPost);
  }
}
