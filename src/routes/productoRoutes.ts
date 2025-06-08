import { Router } from "express";
import { ProductoController } from "../controllers/productos.controller";
import { ProductoService } from "../services/productos.service";
import { AuthMiddleware } from "../middlewares";
import { UserRoles } from "../data";

export class ProductoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProductoController(new ProductoService());

    // Rutas públicas
    router.get("/todo", controller.getAll);
    router.get("/detalle/:id", controller.getById);
    router.get("/categoria/:categoriaId", controller.getProductosByCategoria);

    // Rutas protegidas (solo admin)
    router.post("/", 
      AuthMiddleware.validateUserJwt, 
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.create
    );

    router.put("/:id", 
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.update
    );

    router.patch("/:id/stock", 
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.updateStock
    );

    router.delete("/:id", 
      AuthMiddleware.validateUserJwt,
      AuthMiddleware.verificarRol(UserRoles.admin),
      controller.delete
    );

    return router;
  }
}