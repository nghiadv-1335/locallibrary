import { AppDataSource } from "../config/typeorm";
import { Genre } from "../entities/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export async function getGenres(): Promise<Genre[]> {
  return await genreRepository.find({
    order: { name: "ASC" },
  });
}
