import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataPostInput } from './dto/data-post.input';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @Inject(forwardRef(() => AuthorsService))
    private _authorService: AuthorsService,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async createPost(data: DataPostInput): Promise<Post> {
    const newPost = this.postsRepository.create(data);
    return await this.postsRepository.save(newPost);
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAuthor(id: number): Promise<Author> {
    return await this._authorService.findOne(id);
  }
}
