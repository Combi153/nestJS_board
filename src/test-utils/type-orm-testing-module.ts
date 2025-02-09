import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/domain/entities/post.entity';
import { Comment } from '../posts/domain/entities/comment.entity';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    autoLoadEntities: true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Post, Comment]),
];
