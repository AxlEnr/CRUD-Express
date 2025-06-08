import { Router } from "express";
import { OrdenDetalleController } from "../controllers/ordenesDetalles.controller";
import { OrdenDetalleService } from "../services/ordenesDetalles.services";
import { AuthMiddleware } from "../middlewares";

export class OrdenDetalleRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new OrdenDetalleService();
    const controller = new OrdenDetalleController(service);

    // Todas las rutas requieren autenticación
    router.use(AuthMiddleware.validateUserJwt);

    // Obtener detalles por orden
    router.get("/detallesOrden/:orderId", controller.getByOrder);

    // Crear nuevo detalle (usar solo si se modifica orden existente)
    router.post("/crearDetalle", controller.create);

    // Actualizar detalle
    router.put("/actualizar/:id", controller.update);

    // Eliminar detalle
    router.delete("/cancelar/:id", controller.delete);

    return router;
  }
}