import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { DataPostInput } from './dto/data-post.input';
import { Logger } from '@nestjs/common';

@Resolver()
export class PostsResolver {
  constructor(private _postService: PostsService) {}

  private readonly logger = new Logger();

  @Query((returns) => [Post])
  async posts(): Promise<Post[]> {
    const posts: Post[] = await this._postService.findAll();
    this.logger.log(`POSTS: ${posts}`);
    return posts;
  }

  @Query((returns) => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    const foundPost: Post = await this._postService.findOneById(id);
    return foundPost;
  }

  @Mutation((returns) => Post)
  async createPost(@Args('Data') data: DataPostInput): Promise<Post> {
    const post: Post = await this._postService.createPost(data);
    this.logger.log(post);
    console.log(post);
    return post;
  }
}
