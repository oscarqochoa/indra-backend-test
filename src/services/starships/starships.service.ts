import { Repository } from "typeorm";
import { injectable } from "inversify";
import { inject } from "inversify/lib/annotation/inject";

import { Starship } from "src/entities/starship.entity";

import { ICreateStarship } from "@functions/starships/create-starship.interface";
import { ICreateStarshipPilot } from "src/common/interfaces/create-starship-pilot.interface";
import { ICreateStarshipMovie } from "src/common/interfaces/create-starship-movie.interface";

import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { StarshipPilotsService } from "./starship-pilots.service";
import { StarshipMoviesService } from "./starship-movies.service";


@injectable()
export class StarshipsService {

    constructor(
        @inject('STARSHIP_REPOSITORY')
        private readonly _starshipsRepository: Repository<Starship>,
        @inject('STARSHIP_PILOT_SERVICE')
        private readonly _starshipPilotService: StarshipPilotsService,
        @inject('STARSHIP_MOVIE_SERVICE')
        private readonly _starshipMovieService: StarshipMoviesService
    ) {

    }

    async show(id: string): Promise<Starship> {
        const starship: Starship | null = await this._starshipsRepository.createQueryBuilder('starship')
            .where('starship.id = :id', { id })
            .leftJoinAndSelect('starship.pilotos', 'starship_pilots')
            .leftJoinAndSelect('starship.peliculas', 'starship_movies')
            .getOne();

        if (!starship) throw new Error('Starship not found');

        return starship;
    }

    async get(): Promise<Starship[]> {
        const starship: Starship[] | [] = await this._starshipsRepository.createQueryBuilder('starship')
            .leftJoinAndSelect('starship.pilotos', 'starship_pilots')
            .leftJoinAndSelect('starship.peliculas', 'starship_movies')
            .getMany();

        if (!starship) throw new Error('Starship not found');

        return starship;
    }

    async create(data: ICreateStarship): Promise<Starship> {
        try {
            const starship = this._starshipsRepository.create(data);
            await this._starshipsRepository.save(starship);

            // Create starship pilots massivelly
            if (data?.pilotos?.length > 0) {
                const params: ICreateStarshipPilot[] = data.pilotos.map((item: string) => {
                    console.log(item);
                    return {
                        starship: starship.id,
                        nombre: item
                    };
                });

                console.log(params);

                await this._starshipPilotService.createMassively(params);
            }

            // Create starship movies massivelly
            if (data?.peliculas?.length > 0) {
                const params: ICreateStarshipMovie[] = data.peliculas.map((item: string) => {
                    return {
                        starship: starship.id,
                        nombre: item
                    };
                });

                await this._starshipMovieService.createMassively(params);
            }

            return await this.show(starship.id);
        } catch (error) {
            console.log(error);
            (new HandleExceptionHelper(error));
        }
    }

    async createMassively(data: any): Promise<void> {
        const insertPromises = [];

        data.forEach((item: any) => {
            insertPromises.push(this.create(item));
        })

        await Promise.all(insertPromises);
    }
}