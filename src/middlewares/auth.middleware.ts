import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../config/jwt.adapter";
import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";

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
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) {
        res.status(401).json({ error: 'Token no válido' });
        return;
      }

      const user = await prisma.usuarios.findUnique({ 
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  static verificarRol = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
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
}