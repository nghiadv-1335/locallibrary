import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Book } from "./book.entity";
import { BookInstanceStatus, EntityPropertyLength } from "../common/constants";

@Entity()
export class BookInstance extends Base {
  @Column({ length: EntityPropertyLength.MEDIUM })
  imprint: string;

  @Column({
    type: "enum",
    enum: BookInstanceStatus,
    default: BookInstanceStatus.AVAILABLE,
  })
  status: BookInstanceStatus;

  @Column({ type: "date" })
  due_back: string;

  @ManyToOne(() => Book, (book) => book.book_instances)
  book: Book;

  url(): string {
    return `/book-instances/${this.id}`;
  }
}
