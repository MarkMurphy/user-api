import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Usage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column()
  endpoint: string;

  @CreateDateColumn()
  time: Date;

  @Column()
  status: number;

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  ms?: number;

  @Column({ nullable: true })
  bytes?: number;

  constructor(partial?: Partial<Usage>) {
    Object.assign(this, partial);
  }
}

export class UsageSummary {
  endpoint: string;
  hits: number;

  constructor(partial: Partial<UsageSummary>) {
    this.endpoint = String(partial.endpoint);
    this.hits = Number(partial.hits);
  }
}
