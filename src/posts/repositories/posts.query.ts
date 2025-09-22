import { Query } from '../../common/repositories/common-repository';

export class PostsQuery extends Query {
  writer?: string;
  content?: string;
}
