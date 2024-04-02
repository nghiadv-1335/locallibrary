import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base";
import { Book } from "./book.entity";
import { EntityPropertyLength } from "../common/constants";

@Entity()
export class Author extends Base {
  @Column({ length: EntityPropertyLength.MEDIUM })
  first_name: string;

  @Column({ length: EntityPropertyLength.MEDIUM })
  family_name: string;

  @Column({ type: "date", nullable: true })
  day_of_birth: string;

  @Column({ type: "date", nullable: true })
  day_of_death: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  name(): string {
    return `${this.first_name} ${this.family_name}`;
  }

  url(): string {
    return `/authors/${this.id}`;
  }
}
