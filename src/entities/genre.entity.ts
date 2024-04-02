import { Entity, Column, ManyToMany } from "typeorm";
import { Base } from "./base";
import { Book } from "./book.entity";
import { EntityPropertyLength } from "../common/constants";

@Entity()
export class Genre extends Base {
  @Column({ length: EntityPropertyLength.SMALL })
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];

  url(): string {
    return `/genres/${this.id}`;
  }
}
