// Validator schemas
import getLocalStarshipsSchema from './get-local-starships.schema';

import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/get-local-starships.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'starships/get',
                request: {
                    schemas: {
                        'application/json': getLocalStarshipsSchema,
                    },
                },
            },
        },
    ]
};
