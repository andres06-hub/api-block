import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { DataPostInput } from './dto/data-post.input';
import { Logger } from '@nestjs/common';
import { Author } from 'src/authors/entities/author.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private _postService: PostsService) {}

  private readonly logger = new Logger();

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts: Post[] = await this._postService.findAll();
    this.logger.log(`POSTS: ${posts}`);
    return posts;
  }

  @Query(() => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    const foundPost: Post = await this._postService.findOneById(id);
    return foundPost;
  }

  @ResolveField(() => Author)
  async author(@Parent() post: Post): Promise<Author> {
    return this._postService.getAuthor(post.authorId);
  }

  @Mutation(() => Post)
  async createPost(@Args('Data') data: DataPostInput): Promise<Post> {
    const post: Post = await this._postService.createPost(data);
    this.logger.log(post);
    return post;
  }
}
