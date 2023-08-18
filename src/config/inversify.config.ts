import { Repository } from "typeorm";
import { Container } from "inversify";

import { AppDataSource } from "./database.config";

import { StarshipsService } from "src/services/starships/starships.service";
import { StarshipPilotsService } from "src/services/starships/starship-pilots.service";
import { StarshipMoviesService } from "src/services/starships/starship-movies.service";
import { SwapiService } from "src/services/external/swapi.service";

import { StarshipPilot } from "src/entities/starship-pilot.entity";
import { Starship } from "src/entities/starship.entity";
import { StarshipMovie } from "src/entities/starship-movie.entity";


const container = new Container();

container.bind<SwapiService>(SwapiService).to(SwapiService);
container.bind<StarshipsService>(StarshipsService).to(StarshipsService);
container.bind<StarshipPilotsService>(StarshipPilotsService).to(StarshipPilotsService);
container.bind<StarshipMoviesService>(StarshipMoviesService).to(StarshipMoviesService);


container.bind<StarshipsService>('STARSHIP_SERVICE').to(StarshipsService);
container.bind<StarshipPilotsService>('STARSHIP_PILOT_SERVICE').to(StarshipPilotsService);
container.bind<StarshipMoviesService>('STARSHIP_MOVIE_SERVICE').to(StarshipMoviesService);

container.bind<Repository<Starship>>('STARSHIP_REPOSITORY').toDynamicValue(() => AppDataSource.getRepository(Starship));
container.bind<Repository<StarshipPilot>>('STARSHIP_PILOT_REPOSITORY').toDynamicValue(() => AppDataSource.getRepository(StarshipPilot));
container.bind<Repository<StarshipMovie>>('STARSHIP_MOVIE_REPOSITORY').toDynamicValue(() => AppDataSource.getRepository(StarshipMovie));

export { container };