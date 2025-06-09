import { Router } from "express";
import { ProductoRoutes } from "./routes/productos.routes";
import { CarritoRoutes } from "./routes/carritroRoutes";
import { OrdenesRoutes } from "./routes/ordenesRoutes";
import { OrdenDetalleRoutes } from "./routes/ordenesDetallesRoutes";



export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", ProductoRoutes.routes);
        router.use("/api/carrito", CarritoRoutes.routes);
        router.use("/api/ordenes", OrdenesRoutes.routes);
        router.use("/api/ordenesDetalles", OrdenDetalleRoutes.routes);

        return router;
    }
}