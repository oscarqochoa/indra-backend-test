// Validator schemas
import getSwapiStarshipsSchema from '../get-swapi-starships/get-swapi-starships.schema';

import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/get-swapi-starships.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'starships/get-from-swapi',
                request: {
                    schemas: {
                        'application/json': getSwapiStarshipsSchema,
                    },
                },
            },
        },
    ]
};
