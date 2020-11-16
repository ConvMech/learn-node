import {Entity, OneToMany, Column} from "typeorm";
import { CommonEntity } from "./Entity";
import { Post } from './Post';

@Entity('account')
export class Account extends CommonEntity {
  @Column()
  public name: string;

  @Column({ type: 'text', unique: true })
  public email: string;

  @Column({ type: 'text', nullable: true, array: true })
  public permissions?: string[];

  @Column('text')
  public password: string;

  @OneToMany(type => Post, post => post.account)
  public posts: Post[];
}
