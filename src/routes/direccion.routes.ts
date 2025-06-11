import { Router } from "express";
import { DireccionController } from "../controllers/direccion.controller";
import { DireccionService } from "../services/direccion.service";

export class DireccionRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DireccionController(new DireccionService());

    // Obtener direcciones de un usuario
    router.get("/usuario/:id_usuario", (req, res, next) => {
      controller.getDirecciones(req, res).catch(next);
    });

    // Crear una nueva dirección para un usuario
    router.post("/usuario/:id_usuario", (req, res, next) => {
      controller.createDireccion(req, res).catch(next);
    });

    // Actualizar una dirección existente
    router.put("/:id", (req, res, next) => {
      controller.updateDireccion(req, res).catch(next);
    });

    // Eliminar una dirección
    router.delete("/:id", (req, res, next) => {
      controller.deleteDireccion(req, res).catch(next);
    });

    return router;
  }
}