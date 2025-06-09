"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const resenas_routes_1 = require("./routes/resenas.routes");
const productos_routes_1 = require("./routes/productos.routes");
const users_routes_1 = require("./routes/users.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/productos", productos_routes_1.ProductoRoutes.routes);
        router.use("/api/resenas", resenas_routes_1.ResenaRoutes.routes);
        router.use("/api/users", users_routes_1.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
