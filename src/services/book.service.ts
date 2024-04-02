import { AppDataSource } from "../config/typeorm";
import { Author } from "../entities/author.entity";
import { Book } from "../entities/book.entity";
import { BookInstance } from "../entities/book_instance.entity";
import { Genre } from "../entities/genre.entity";
import { BookInstanceStatus } from "../common/constants";

const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);
const genreRepository = AppDataSource.getRepository(Genre);
const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export async function getGeneralInfo(): Promise<
  [number, number, [BookInstance[], number], number, number]
> {
  return await Promise.all([
    bookRepository.count(),
    bookInstanceRepository.count(),
    bookInstanceRepository.findAndCount({
      where: { status: BookInstanceStatus.AVAILABLE },
    }),
    authorRepository.count(),
    genreRepository.count(),
  ]);
}

export async function getBooks(): Promise<Book[]> {
  return await bookRepository.find({
    order: { title: "ASC" },
    relations: ["author"],
  });
}