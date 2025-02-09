import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { TypeOrmTestingModule } from '../test-utils/type-orm-testing-module';
import { Post } from '../posts/domain/entities/post.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: Repository<Comment>;
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
    commentRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
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

  it('contentId, postId, writer, content 를 입력하면 comment 를 수정할 수 있다', async (): Promise<void> => {
    // given
    const comment = await commentRepository.save(
      Comment.create({
        writer: 'writer',
        content: 'content',
        post: post,
      }),
    );

    // when
    const updatedComment = await service.update(comment.id, post.id, {
      writer: 'writer2',
    });

    // then
    expect(updatedComment).toBeDefined();
    expect(updatedComment.writer).toBe('writer2');
  });

  it('수정하려는 writer 길이가 길면 예외가 발생한다', async (): Promise<void> => {
    // given
    const comment = await commentRepository.save(
      Comment.create({
        writer: 'writer',
        content: 'content',
        post: post,
      }),
    );

    // when & then
    await expect(() =>
      service.update(comment.id, post.id, {
        writer: 'longLengthWriter',
      }),
    ).rejects.toThrow(
      new Error('작성자 이름은 1 글자 초과 7 글자 미만이어야 합니다.'),
    );
  });

  it('수정하려는 content 길이가 짧으면 예외가 발생한다', async (): Promise<void> => {
    // given
    const comment = await commentRepository.save(
      Comment.create({
        writer: 'writer',
        content: 'content',
        post: post,
      }),
    );

    // when & then
    await expect(() =>
      service.update(comment.id, post.id, {
        content: '',
      }),
    ).rejects.toThrow(
      new Error('댓글 내용은 1 글자 초과 100 글자 미만이어야 합니다.'),
    );
  });
});
