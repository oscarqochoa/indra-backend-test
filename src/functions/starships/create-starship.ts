import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AppDataSource } from 'src/config/database.config';
import { container } from 'src/config/inversify.config';
import { StarshipsService } from 'src/services/starships/starships.service';
import { ICreateStarship } from './create-starship.interface';

import schema from './create-starship.schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    await AppDataSource.initialize();

    const starshipService: StarshipsService = container.get(StarshipsService);

    const data: ICreateStarship = event.body;
    const response = await starshipService.create(data);

    await AppDataSource.destroy();

    return formatJSONResponse({
        data: response
    });
};

export const main = middyfy(handler);
