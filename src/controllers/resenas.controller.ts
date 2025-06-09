import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Helper para verificar errores de Prisma
function isPrismaError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export const getResenasPorProducto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const resenas = await prisma.resenas.findMany({
      where: { id_producto: Number(id) },
      include: {
        usuario: {
          select: {
            nombre: true
          }
        }
      }
    });

    res.json({ 
      data: resenas, 
      productoId: id 
    });
  } catch (error) {
    next(error);
  }
};

export const postResena = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_usuario, id_producto, calificacion, ...rest } = req.body;

    // Validación de calificación (1-5)
    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({
        error: 'La calificación debe ser entre 1 y 5'
      });
    }

    // Validación de existencia de usuario y producto
    const [usuario, producto] = await Promise.all([
      prisma.usuarios.findUnique({ where: { id: Number(id_usuario) } }),
      prisma.productos.findUnique({ where: { id: Number(id_producto) } })
    ]);

    if (!usuario || !producto) {
      return res.status(404).json({
        error: !usuario ? 'Usuario no encontrado' : 'Producto no encontrado'
      });
    }

    const resenaCreada = await prisma.resenas.create({
      data: {
        id_usuario: Number(id_usuario),
        id_producto: Number(id_producto),
        calificacion,
        ...rest
      },
      include: {
        usuario: {
          select: {
            nombre: true
          }
        }
      }
    });

    res.status(201).json({ 
      message: 'Reseña creada exitosamente', 
      data: resenaCreada 
    });
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2003') {
      return res.status(400).json({
        error: 'Error de referencia',
        message: 'El usuario o producto no existe'
      });
    }
    next(error);
  }
};

export const deleteResena = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.resenas.delete({
      where: { id: Number(id) }
    });

    res.json({ 
      message: 'Reseña eliminada correctamente' 
    });
  } catch (error) {
    if (isPrismaError(error) && error.code === 'P2025') {
      return res.status(404).json({
        error: 'Reseña no encontrada'
      });
    }
    next(error);
  }
};