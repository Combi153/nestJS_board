import { Post } from './post.entity';

describe('PostEntity', (): void => {
  it('writer, content 를 입력하면 Post 를 생성할 수 있다', (): void => {
    // given
    const writer = 'writer';
    const content = 'content';

    // when
    const post = Post.create(writer, content);

    // then
    expect(post).toBeDefined();
    expect(post.writer).toBe('writer');
    expect(post.content).toBe('content');
  });

  it('유효하지 않은 writer 를 입력하면 예외가 발생한다', (): void => {
    // given
    const writer = 'admin';

    // when & then
    expect(() => Post.create(writer, 'content')).toThrow(
      new Error('작성자는 admin 일 수 없습니다.'),
    );
  });
});
