import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @Expose()
  readonly kind = this.constructor.name;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude()
  password: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
