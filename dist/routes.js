"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const productoRoutes_1 = require("./routes/productoRoutes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/productos", productoRoutes_1.ProductoRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
