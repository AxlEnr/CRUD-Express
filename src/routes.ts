import { Router } from "express";
import { ProductoRoutes } from "./routes/productoRoutes";
import { ResenaRoutes } from "./routes/resenas.routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", ProductoRoutes.routes);
        router.use("/api/resenas", ResenaRoutes.routes); 

        return router;
    }
}