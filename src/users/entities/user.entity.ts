import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common-entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

  static of(name: string, email: string): User {
    return new User(name, email);
  }
}
