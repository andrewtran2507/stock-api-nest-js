import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import PostEntity from './post.entity';
import PostNotFoundException from './exceptions/postNotFound.exception';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>,
  ) {}

  getPosts() {
    return this.postRepository.findAll();
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findOne({
      id,
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async createPost(post: CreatePostDto /*user: User*/) {
    const newPost: PostEntity = await this.postRepository.create(post);
    await this.postRepository.persistAndFlush(newPost);
    return newPost;
  }

  async updatePost(id: string, post: UpdatePostDto) {
    const existingPost = await this.getPostById(id);
    wrap(existingPost).assign(post);
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }

  async deletePost(id: string, withFlush = true) {
    const post = await this.getPostById(id);
    this.postRepository.remove(post);
    if (withFlush) {
      return this.postRepository.flush();
    }
  }

  async getDeletedPost(id: string) {
    const post = await this.postRepository.findOne(
      {
        id,
      },
      {
        filters: {
          softDelete: {
            getOnlyDeleted: true,
          },
        },
      },
    );
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async softDeletePost(id: string) {
    const existingPost = await this.getPostById(id);
    existingPost.deleted_at = new Date();
    await this.postRepository.persistAndFlush(existingPost);
  }

  async restorePost(id: string) {
    const existingPost = await this.getDeletedPost(id);
    existingPost.deleted_at = null;
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }
}
