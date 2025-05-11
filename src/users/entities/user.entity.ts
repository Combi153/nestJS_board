import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common-entity';
import { hash } from '../utils/hashing';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  static async of(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hash(password);
    return user;
  }
}
