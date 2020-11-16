import {Entity, ManyToOne, Column} from "typeorm";
import { CommonEntity } from "./Entity"
import { Account } from './Account';

@Entity('post')
export class Post extends CommonEntity {
  @Column()
  public title: string;

  @Column('text')
  public text: string;

  @Column({ nullable: true })
  public photo?: string;

  @ManyToOne(type => Account, account => account.posts, { nullable: false })
  public account: Account;
}
