// import { paginatorParams, paginatorRequiredParams } from "src/common/validators/paginator.schema";

export default {
    type: "object",
    properties: {
        nombre: { type: 'string' },
        modelo: { type: 'string' },
    },
    required: [
    ]
} as const;
