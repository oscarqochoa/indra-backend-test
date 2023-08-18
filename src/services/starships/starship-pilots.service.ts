import { Repository } from "typeorm";
import { inject, injectable } from "inversify";

import { StarshipPilot } from "src/entities/starship-pilot.entity";

import { ICreateStarshipPilot } from "src/common/interfaces/create-starship-pilot.interface";

@injectable()
export class StarshipPilotsService {

    constructor(
        @inject('STARSHIP_PILOT_REPOSITORY')
        private readonly _starshipPilotRepository: Repository<StarshipPilot>
    ) {

    }

    async create(data: ICreateStarshipPilot): Promise<StarshipPilot> {
        try {
            const starshipPilot = this._starshipPilotRepository.create(data);
            await this._starshipPilotRepository.save(starshipPilot);
            return starshipPilot;
        } catch (error) {

        }
    }

    async createMassively(data: ICreateStarshipPilot[]): Promise<StarshipPilot[]> {
        try {
            const insertPromises = [];

            data.forEach((pilot: ICreateStarshipPilot) => {
                insertPromises.push(this.create(pilot));
            })

            return await Promise.all(insertPromises);
        } catch (error) {

        }
    }

}