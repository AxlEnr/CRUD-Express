import { Router } from "express";
import { ProductoRoutes } from "./routes/productos.routes";
import { CarritoRoutes } from "./routes/carritroRoutes";
import { OrdenesRoutes } from "./routes/ordenesRoutes";
import { OrdenDetalleRoutes } from "./routes/ordenesDetallesRoutes";
import { ResenaRoutes } from "./routes/resenas.routes";
import { UserRoutes } from "./routes/users.routes";



export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", ProductoRoutes.routes);
        router.use("/api/carrito", CarritoRoutes.routes);
        router.use("/api/ordenes", OrdenesRoutes.routes);
        router.use("/api/ordenesDetalles", OrdenDetalleRoutes.routes);
        router.use("/api/resenas", ResenaRoutes.routes);
        router.use("/api/users", UserRoutes.routes);

        return router;
    }
}