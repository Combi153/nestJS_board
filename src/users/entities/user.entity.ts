import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common-entity';
import { isMatch } from '../utils/hashing';
import { MaxLength, MinLength } from 'class-validator';

export const PASSWORD_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 4;

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @MaxLength(PASSWORD_MAX_LENGTH)
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  static of(name: string, email: string, password: string): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return user;
  }

  async isPasswordValid(password: string): Promise<boolean> {
    return await isMatch(password, this.password);
  }
}
