import { Router } from "express";
import { ProductoRoutes } from "./routes/productoRoutes";



export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", ProductoRoutes.routes);

        return router;
    }
}