import { BookInstance } from "../entities/book_instance.entity";
import { AppDataSource } from "../config/typeorm";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export async function getBookInstances(): Promise<BookInstance[]> {
  return await bookInstanceRepository.find({
    relations: ["book"],
  });
}

export async function getBookInstanceDetails(id: number): Promise<BookInstance | null> {
  return await bookInstanceRepository.findOne({
    relations: ["book"],
    where: { id: id },
  });
}
