"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const productos_routes_1 = require("./routes/productos.routes");
const carritroRoutes_1 = require("./routes/carritroRoutes");
const ordenesRoutes_1 = require("./routes/ordenesRoutes");
const ordenesDetallesRoutes_1 = require("./routes/ordenesDetallesRoutes");
const resenas_routes_1 = require("./routes/resenas.routes");
const users_routes_1 = require("./routes/users.routes");
const resenas_routes_1 = require("./routes/resenas.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/productos", productos_routes_1.ProductoRoutes.routes);

        router.use("/api/carrito", carritroRoutes_1.CarritoRoutes.routes);
        router.use("/api/ordenes", ordenesRoutes_1.OrdenesRoutes.routes);
        router.use("/api/ordenesDetalles", ordenesDetallesRoutes_1.OrdenDetalleRoutes.routes);
        router.use("/api/resenas", resenas_routes_1.ResenaRoutes.routes);
        router.use("/api/users", users_routes_1.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
