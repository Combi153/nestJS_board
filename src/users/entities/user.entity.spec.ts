import { User } from './user.entity';
import { hash } from '../utils/hashing';

describe('UserEntity', (): void => {
  it('정보를 입력해 User 를 생성할 수 있다', async (): Promise<void> => {
    // given
    const name = 'name';
    const email = 'email@email.com';
    const password = await hash('password');

    // when
    const user = User.of(name, email, password);

    // then
    expect(user).toBeDefined();
  });

  it('비밀번호가 맞는지 확인할 수 있다', async (): Promise<void> => {
    // given
    const name = 'name';
    const email = 'email@email.com';
    const password = await hash('password');

    const user = User.of(name, email, password);

    // when
    const actual = await user.isPasswordValid('password');

    // when & then
    expect(actual).toBe(true);
  });
});
