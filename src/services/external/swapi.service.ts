import { HttpAdapter } from "src/common/adapters/http.adapter";

import { IHttpAdapter } from "src/common/interfaces/http-adapter.interface";
import { IHttpResponse } from "src/common/interfaces/http-response.interface";
import { ISwapiSpeciesResponse } from "src/common/interfaces/swapi-species-response.interface";
import { ISwapiStarshipsResponse, Result as StarshipResult } from "src/common/interfaces/swapi-starships-response.interface";

import { StatusHelper } from "src/common/helpers/status.helper";
import { TranslatorService } from "../translator.service";
import { IGetSwapiStarships } from "@functions/get-swapi-starships/get-swapi-starships.interface";
import { inject, injectable } from "inversify";
import { StarshipsService } from "../starships/starships.service";

@injectable()
export class SwapiService {

    private _http: IHttpAdapter
    private _baseUrl: string = 'https://swapi.py4e.com/api/';

    constructor(
        @inject('STARSHIP_SERVICE')
        private readonly _starshipsService: StarshipsService
    ) {
        this._http = new HttpAdapter();
    }

    async getStarships(param: any = ''): Promise<ISwapiStarshipsResponse | null> {
        try {
            const response: IHttpResponse = await this._http.get<ISwapiStarshipsResponse>({ url: this._baseUrl + 'starships', param: param });
            if (StatusHelper.responseIsSucess(response)) {
                return response.data;
            }
        } catch (error) {
            return null;
        }
    }

    async getTranslatedStarships(params: IGetSwapiStarships): Promise<ISwapiStarshipsResponse | null> {
        try {
            const starships = await this.getStarships();

            const translator = new TranslatorService();

            const insertPromises = [];

            starships.results.forEach((result: StarshipResult) => {
                insertPromises.push(translator.translateMultilevelObjectKeys(result));
            })

            starships.results = await Promise.all(insertPromises);

            // if (params.store == 'true' || params.store == '1') {
            //     await this._starshipsService.createMassively(starships.results);
            // }

            return starships;
        } catch (error) {

        }
    }

    async getSpecies(param: any = ''): Promise<ISwapiSpeciesResponse | null> {
        try {
            const response: IHttpResponse = await this._http.get<ISwapiSpeciesResponse>({ url: this._baseUrl + 'species', param: param });
            if (StatusHelper.responseIsSucess(response)) {
                return response.data;
            }
        } catch (error) {
            return null;
        }
    }

}