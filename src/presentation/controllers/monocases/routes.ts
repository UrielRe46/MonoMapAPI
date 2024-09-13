import { Router } from "express";
import { MonoCaseController } from "./controller";

export class MonoCaseRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new MonoCaseController();
        router.get("/allcases", controller.getMonoCases);
        router.get("/lastweekcases", controller.getMonoCasesLastWeek);
        router.post("/", controller.createMonocase);
        router.get("/:id", controller.getMonocaseById);
        router.put("/:id", controller.updateMonocase);
        router.delete("/:id", controller.deleteMonocase);
        return router;
    }
}