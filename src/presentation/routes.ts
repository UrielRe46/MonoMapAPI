import { Router } from "express";
import { MonoCaseRoutes } from "./controllers/monocases/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/api/monocase", MonoCaseRoutes.routes);
        return router;
    }
}
