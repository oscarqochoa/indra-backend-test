import { StarshipMovie } from "src/entities/starship-movie.entity";
import { StarshipPilot } from "src/entities/starship-pilot.entity";
import { Starship } from "src/entities/starship.entity";
import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./environment";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    synchronize: true,
    entities: [
        Starship,
        StarshipMovie,
        StarshipPilot
    ],
    subscribers: [],
    migrations: [],
});
