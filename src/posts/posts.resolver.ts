import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { DataPostInput } from './dto/data-post.input';
import { Logger } from '@nestjs/common';

@Resolver()
export class PostsResolver {
  constructor(private _postService: PostsService) {}

  private readonly logger = new Logger();

  @Query((returns) => [Post])
  async posts() {
    const posts: Post[] = await this._postService.findAll();
    this.logger.log(`POSTS: ${posts}`);
    return posts;
  }

  @Mutation((returns) => Post)
  async createPost(@Args('Data') data: DataPostInput) {
    const post: Post = await this._postService.createPost(data);
    this.logger.log(post);
    console.log(post);
    return post;
  }
}
