import { In } from "typeorm";
import { AppDataSource } from "../config/typeorm";
import { Genre } from "../entities/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export async function getGenres(): Promise<Genre[]> {
  return await genreRepository.find({
    order: { name: "ASC" },
  });
}

export async function getGenreDetails(id: number): Promise<Genre | null> {
  return await genreRepository.findOne({
    relations: ["books"],
    where: { id: id },
  });
}

export async function getGenreByName(name: string): Promise<Genre | null> {
  return await genreRepository.findOne({
    where: { name: name },
  });
}

export async function deleteGenre(id: number) {
  await genreRepository.delete(id);
}

export async function saveGenre(genre: Genre): Promise<Genre> {
  return await genreRepository.save(genre);
}

export async function getGenresByIds(ids: number[]): Promise<Genre[]> {
  return await genreRepository.find({
    where: { id: In(ids) },
  });
}
