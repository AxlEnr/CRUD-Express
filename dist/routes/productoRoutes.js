"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRoutes = void 0;
const express_1 = require("express");
const productos_controller_1 = require("../controllers/productos.controller");
const productos_service_1 = require("../services/productos.service");
class ProductoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new productos_controller_1.ProductoController(new productos_service_1.ProductoService());
        // Rutas públicas
        router.get("/todo", controller.getAll);
        router.get("/detalle/:id", controller.getById);
        router.get("/categoria/:categoriaId", controller.getProductosByCategoria);
        // Rutas protegidas (solo admin)
        router.post("/crear", controller.create);
        router.put("/actualizar/:id", controller.update);
        router.patch("/:id/stock", controller.updateStock);
        router.delete("/eliminar/:id", controller.delete);
        return router;
    }
}
exports.ProductoRoutes = ProductoRoutes;
