import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { TypeOrmTestingModule } from '../test-utils/type-orm-testing-module';
import { Post } from '../posts/domain/entities/post.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CommentsService', () => {
  let service: CommentsService;
  let post: Post;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    const postRepository = module.get<Repository<Post>>(
      getRepositoryToken(Post),
    );

    post = await postRepository.save(Post.create('writer', 'content'));
  });

  it('postId, writer, content 를 입력하면 comment 를 생성할 수 있다', async (): Promise<void> => {
    // given
    const postId = post.id;
    const writer = 'writer';
    const content = 'content';

    // when
    const comment = await service.create(postId, { writer, content });

    // then
    expect(comment).toBeDefined();
    expect(comment.writer).toBe('writer');
    expect(comment.content).toBe('content');
    expect(comment.post).toStrictEqual(post);
  });

  it('존재하지 않는 postId 를 입력하면 예외가 발생한다', async (): Promise<void> => {
    // given
    const postId = 'not exist post id';
    const writer = 'writer';
    const content = 'content';

    // when & then
    await expect(() =>
      service.create(postId, { writer, content }),
    ).rejects.toThrow(
      new Error(`Post 가 존재하지 않습니다 postId : ${postId}`),
    );
  });
});
