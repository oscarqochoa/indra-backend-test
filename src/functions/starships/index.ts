// Validator schemas
import createStarshipSchema from './create-starship.schema';

import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/create-starship.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'starship',
                request: {
                    schemas: {
                        'application/json': createStarshipSchema,
                    },
                },
            },
        },
    ],
};
