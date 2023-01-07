import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => PostsService))
    private _postService: PostsService,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor: Author = this.authorRepository.create(createAuthorInput);
    return await this.authorRepository.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author: Author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });
    return author;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  async remove(id: number) {
    return await this.authorRepository.delete({ id });
  }

  async getPost(id: number): Promise<Post> {
    return await this._postService.findOneById(id);
  }
}
