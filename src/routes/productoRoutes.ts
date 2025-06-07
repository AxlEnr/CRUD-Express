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
    router.post("/crear",
      controller.create
    );

    router.put("/actualizar/:id",
      controller.update
    );

    router.patch("/:id/stock",
      controller.updateStock
    );

    router.delete("/eliminar/:id",
      controller.delete
    );

    return router;
  }
}