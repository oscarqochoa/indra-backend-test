import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ISwapiStarshipsResponse } from "src/common/interfaces/swapi-starships-response.interface";
import { container } from "src/config/inversify.config";
import { SwapiService } from "src/services/external/swapi.service";
import { IGetSwapiStarships } from "./get-swapi-starships.interface";

import schema from './get-swapi-starships.schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const swapiService = container.get(SwapiService);

    const params: IGetSwapiStarships = event.queryStringParameters;
    const response: ISwapiStarshipsResponse = await swapiService.getTranslatedStarships(params);

    return formatJSONResponse({
        data: response
    });
}



export const main = middyfy(handler);