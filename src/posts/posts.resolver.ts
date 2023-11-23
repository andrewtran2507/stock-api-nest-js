import { PostsService } from './posts.service';
import PostEntity from './post.entity';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(@Inject(PostsService) private postsService: PostsService) {}

  @Query(() => PostEntity)
  async post(@Args('id') id: string): Promise<PostEntity> {
    return await this.postsService.getPostById(id);
  }

  @Query(() => [PostEntity])
  async posts(): Promise<PostEntity[]> {
    return await this.postsService.getPosts();
  }

  @Mutation(() => PostEntity)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<PostEntity> {
    const post: PostEntity = await this.postsService.createPost({
      title,
      content,
    });
    return post;
  }
}
