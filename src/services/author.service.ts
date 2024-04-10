import { AppDataSource } from "../config/typeorm";
import { Author } from "../entities/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export async function getAuthors(): Promise<Author[]> {
  return await authorRepository.find({
    order: { first_name: "ASC" },
  });
}

export async function getAuthorDetails(id: number): Promise<Author | null> {
  return await authorRepository.findOne({
    relations: ["books"],
    where: { id: id },
  });
}

export async function getAuthorById(id: number): Promise<Author | null> {
  return await authorRepository.findOne({
    where: { id: id },
  });
}

export async function deleteAuthor(id: number) {
  await authorRepository.delete(id);
}

export async function saveAuthor(author: Author): Promise<Author> {
  return await authorRepository.save(author);
}
