import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/domain/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { DynamicModule } from '@nestjs/common';

export const TypeOrmTestingModule = (): DynamicModule[] => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    autoLoadEntities: true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Post, Comment]),
];
