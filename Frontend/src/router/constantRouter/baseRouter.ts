import { CONSTANT_ROUTES } from "./constantRouter.ts";
import { DOCUMENT_ROUTES } from "./documentRouter.ts";

export const BASE_ROUTER = [...CONSTANT_ROUTES, ...DOCUMENT_ROUTES];
