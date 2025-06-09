import { Router } from "express";
import { OrdenesController } from "../controllers/ordenes.controller";
import { OrdenesService } from "../services/ordenes.services";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../data";

export class OrdenesRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new OrdenesService();
    const controller = new OrdenesController(service);

    // Crear orden desde carrito
    router.post(
      "/crearOrden",
      AuthMiddleware.validateUserJwt,
      controller.createOrder
    );

    // Listar órdenes del usuario actual
    router.get(
      "/ordenes",
      AuthMiddleware.validateUserJwt,
      controller.getUserOrders
    );

    // Listar todas las órdenes (solo admin)
    router.get(
      "/allOrdenes",
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.getAllOrders
    );

    // Actualizar estado (solo admin)
    router.put(
      "/:id/status",
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.updateOrderStatus
    );

    return router;
  }
}