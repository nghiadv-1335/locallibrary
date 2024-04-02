import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Base } from "./base";
import { BookInstance } from "./book_instance.entity";
import { Genre } from "./genre.entity";
import { Author } from "./author.entity";
import { EntityPropertyLength } from "../common/constants";

@Entity()
export class Book extends Base {
  @Column({ length: EntityPropertyLength.MEDIUM })
  title: string;

  @Column({ length: EntityPropertyLength.EXTRA_LARGE })
  summary: string;

  @Column({ length: EntityPropertyLength.SMALL, nullable: true })
  isbn: string;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookInstance, (bookInstance) => bookInstance.book)
  book_instances: BookInstance[];

  url(): string {
    return `/books/${this.id}`;
  }
}
