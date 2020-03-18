import { User } from '../user.entity';

export class List<T> {
  readonly kind = 'List';
  hasNextPage: boolean;
  data: T[];
  constructor(partial?: Partial<List<T>>) {
    Object.assign(this, partial);
  }
}

export class UserList extends List<User> {}
