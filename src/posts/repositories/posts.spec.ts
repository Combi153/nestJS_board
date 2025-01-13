import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';

describe('Posts', () => {
  let provider: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsRepository],
    }).compile();

    provider = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
