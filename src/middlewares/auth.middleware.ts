import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../data";
import { envs } from "../config";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        rol: string;
      };
    }
  }
}

export class AuthMiddleware {
  static validateUserJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token de autorización inválido o ausente" });
      return;
    }

    const token = authorization.split(" ")[1];

    try {
      const secret = envs.JWT_SEED;  
      const payload = jwt.verify(token, secret) as { id: number };

      const user = await prisma.usuarios.findUnique({
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
    } catch (error) {
      console.error("Error en validateUserJwt:", error);
      res.status(401).json({ error: "Token no válido o expirado" });
    }
  };

  static verificarRol = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
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
}
