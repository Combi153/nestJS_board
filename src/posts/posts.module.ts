import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './domain/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './repositories/posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
