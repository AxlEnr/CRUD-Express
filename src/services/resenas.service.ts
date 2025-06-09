import { PrismaClient } from "@prisma/client";
import { CrearResenaDTO } from "../dtos/resenas.dto";
import e from "express";

const prisma = new PrismaClient();

export const obtenerResenasPorProducto = async (id_producto: number) => {
    return await prisma.resenas.findMany({
        where : { id_producto },
        include: {
            usuario: {
                select: {
                    nombre: true,
                },
            },
        },
    });
};

export const crearResena = async (data: CrearResenaDTO) => {
  const compra = await prisma.orden_detalle.findFirst({
    where: {
      id_producto: data.id_producto,
      orden: {
        id_usuario: data.id_usuario,
        estado: 'pagado', 
      },
    },
  });

  if (!compra) {
    throw new Error('El usuario no ha comprado este producto');
  }

  const nuevaResena = await prisma.resenas.create({
    data,
  });

  return nuevaResena;
};