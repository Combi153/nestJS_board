import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';
import { DatabaseModule } from '../../database/database.module';

describe('Posts', () => {
  let provider: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [PostsRepository],
    }).compile();

    provider = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
