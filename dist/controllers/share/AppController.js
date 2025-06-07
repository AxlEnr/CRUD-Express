"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const RequestErrors_1 = require("../../errors/RequestErrors");
const config_1 = require("../../config");
class AppController {
    constructor() {
        this.triggerError = (error, res) => {
            if (error instanceof RequestErrors_1.RequestError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            config_1.Logger.log(`${error}`);
            return res.status(500).json({ error: "Error interno del servidor" });
        };
    }
}
exports.AppController = AppController;
