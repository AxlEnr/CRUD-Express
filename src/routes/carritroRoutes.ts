// src/routes/carrito.routes.ts
import { Router } from "express";
import { CarritoController } from "../controllers/carrito.controller";
import { CarritoService } from "../services/carrito.services";

export class CarritoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CarritoController(new CarritoService());

    // Rutas con id_usuario como parámetro
    router.get("/usuario/:id_usuario", controller.getCart);
    router.post("/usuario/:id_usuario/agregar", controller.addToCart);
    router.put("/usuario/:id_usuario/:cartId/producto/:productId", controller.updateCartItem);
    router.delete("/usuario/:id_usuario/:cartId/producto/:productId", controller.removeFromCart);
    router.delete("/usuario/:id_usuario/vaciar", controller.clearCart);

    return router;
  }
}