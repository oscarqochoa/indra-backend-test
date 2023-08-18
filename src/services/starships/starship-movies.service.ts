import { Repository } from "typeorm";
import { inject, injectable } from "inversify";

import { StarshipMovie } from "src/entities/starship-movie.entity";

import { ICreateStarshipMovie } from "src/common/interfaces/create-starship-movie.interface";

@injectable()
export class StarshipMoviesService {

    constructor(
        @inject('STARSHIP_MOVIE_REPOSITORY')
        private readonly _starshipMovieRepository: Repository<StarshipMovie>
    ) {

    }

    async create(data: ICreateStarshipMovie): Promise<StarshipMovie> {
        try {
            const StarshipMovie = this._starshipMovieRepository.create(data);
            await this._starshipMovieRepository.save(StarshipMovie);
            return StarshipMovie;
        } catch (error) {

        }
    }

    async createMassively(data: ICreateStarshipMovie[]): Promise<StarshipMovie[]> {
        try {
            const insertPromises = [];

            data.forEach((pilot: ICreateStarshipMovie) => {
                insertPromises.push(this.create(pilot));
            })

            return await Promise.all(insertPromises);
        } catch (error) {

        }
    }

}