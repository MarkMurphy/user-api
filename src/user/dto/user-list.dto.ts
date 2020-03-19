import { User } from '../user.entity';

export class List<T> {
  readonly kind = 'List';
  hasNextPage = false;
  data: T[] = [];
  constructor(partial?: Partial<List<T>>) {
    Object.assign(this, partial);
  }
}

export class UserList extends List<User> {}
