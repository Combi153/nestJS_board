import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { TypeOrmTestingModule } from '../test-utils/type-orm-testing-module';
import { PostsRepository } from './repositories/posts.repository';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [PostsService, PostsRepository],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('writer, content 를 입력하면 Post를 생성할 수 있다', async (): Promise<void> => {
    // given
    const createPostDto = new CreatePostDto('writer', 'content');

    // when
    const post = await service.create(createPostDto);

    // then
    expect(post).toBeDefined();
    expect(post.writer).toBe('writer');
    expect(post.content).toBe('content');
  });

  it('유효하지 않은 writer 를 입력하면 예외가 발생한다', async (): Promise<void> => {
    // given
    const createPostDto = new CreatePostDto('admin', 'content');

    // when & then
    await expect(() => service.create(createPostDto)).rejects.toThrow(
      new Error('작성자는 admin 일 수 없습니다.'),
    );
  });
});
