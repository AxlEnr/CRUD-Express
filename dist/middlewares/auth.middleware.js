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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../config/jwt.adapter");
const data_1 = require("../data");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.validateUserJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.status(401).json({ error: 'No hay token en la petición' });
        return;
    }
    if (!authorization.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token Bearer inválido' });
        return;
    }
    const token = authorization.split(' ').at(1) || '';
    try {
        const payload = yield jwt_adapter_1.JwtAdapter.validateToken(token);
        if (!payload) {
            res.status(401).json({ error: 'Token no válido' });
            return;
        }
        const user = yield data_1.prisma.usuarios.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                rol: true
            }
        });
        if (!user) {
            res.status(401).json({ error: 'Token no válido - usuario no encontrado' });
            return;
        }
        if (!user.rol) {
            res.status(403).json({ error: 'Usuario no tiene rol asignado' });
            return;
        }
        req.user = {
            id: user.id,
            rol: user.rol
        };
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
AuthMiddleware.verificarRol = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                error: 'Se requiere verificar el token primero'
            });
            return;
        }
        if (!roles.includes(req.user.rol)) {
            res.status(403).json({
                error: 'No autorizado - Rol insuficiente'
            });
            return;
        }
        next();
    };
};
