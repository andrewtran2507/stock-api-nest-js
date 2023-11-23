import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import PostEntity from './post.entity';
import { PostResolver } from './posts.resolver';
// import { UsersModule } from '../users/users.module';

@Module({
  // imports: [MikroOrmModule.forFeature([PostEntity]), UsersModule],
  imports: [MikroOrmModule.forFeature({ entities: [PostEntity] })],
  controllers: [PostsController],
  providers: [PostsService, PostResolver],
  exports: [PostsService],
})
export class PostsModule {}
