import { Router } from "express";

import { ResenaRoutes } from "./routes/resenas.routes";
import { ProductoRoutes } from "./routes/productos.routes";
import { UserRoutes } from "./routes/users.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/api/productos", ProductoRoutes.routes);
        router.use("/api/resenas", ResenaRoutes.routes); 
        router.use("/api/users", UserRoutes.routes);

        return router;
    }
}