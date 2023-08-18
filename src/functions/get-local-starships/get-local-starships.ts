import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AppDataSource } from 'src/config/database.config';
import { container } from 'src/config/inversify.config';
import { StarshipsService } from 'src/services/starships/starships.service';

import schema from './get-local-starships.schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    await AppDataSource.initialize();

    const starshipService: StarshipsService = container.get(StarshipsService);

    const response = await starshipService.get();

    await AppDataSource.destroy();

    return formatJSONResponse({
        data: response
    });
};

export const main = middyfy(handler);
