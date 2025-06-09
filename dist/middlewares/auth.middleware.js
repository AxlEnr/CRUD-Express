"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_1 = require("../data");
const config_1 = require("../config");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.validateUserJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token de autorización inválido o ausente" });
        return;
    }
    const token = authorization.split(" ")[1];
    try {
        const secret = config_1.envs.JWT_SEED;
        const payload = jsonwebtoken_1.default.verify(token, secret);
        const user = yield data_1.prisma.usuarios.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                rol: true,
            },
        });
        if (!user || !user.rol) {
            res.status(403).json({ error: "Token válido pero usuario no encontrado o sin rol" });
            return;
        }
        req.user = {
            id: user.id,
            rol: user.rol,
        };
        next();
    }
    catch (error) {
        console.error("Error en validateUserJwt:", error);
        res.status(401).json({ error: "Token no válido o expirado" });
    }
});
AuthMiddleware.verificarRol = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: "Token no verificado" });
            return;
        }
        if (!roles.includes(req.user.rol)) {
            res.status(403).json({ error: "No autorizado - Rol insuficiente" });
            return;
        }
        next();
    };
};
