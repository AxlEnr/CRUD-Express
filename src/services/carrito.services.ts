// src/services/carrito.service.ts
import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";
import {
  AddToCartDto,
  UpdateCartItemDto,
  RemoveFromCartDto,
  GetUserCartDto,
} from "../dtos/carrito.dto";

export class CarritoService {
  constructor() {}

  public async getUserCart(id_usuario: number) {
    return await prisma.carrito.findFirst({
      where: { id_usuario },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  public async addToCart(addToCartDto: AddToCartDto) {
    // Verificar si el producto existe
    const producto = await prisma.productos.findUnique({
      where: { id: addToCartDto.id_producto },
    });
    if (!producto) throw RequestError.notFound("Producto no encontrado");

    // Verificar stock disponible
    if (producto.stock < addToCartDto.cantidad) {
      throw RequestError.badRequest("No hay suficiente stock disponible");
    }

    // Buscar o crear carrito
    let carrito = await prisma.carrito.findFirst({
      where: { id_usuario: addToCartDto.id_usuario },
    });

    if (!carrito) {
      carrito = await prisma.carrito.create({
        data: {
          id_usuario: addToCartDto.id_usuario,
        },
      });
    }

    // Verificar si el producto ya está en el carrito
    const itemExistente = await prisma.carrito_detalle.findFirst({
      where: {
        id_carrito: carrito.id,
        id_producto: addToCartDto.id_producto,
      },
    });

    if (itemExistente) {
      // Actualizar cantidad si ya existe
      return await prisma.carrito_detalle.update({
        where: { id: itemExistente.id },
        data: {
          cantidad: itemExistente.cantidad + addToCartDto.cantidad,
        },
        include: {
          producto: true,
        },
      });
    } else {
      // Agregar nuevo item
      return await prisma.carrito_detalle.create({
        data: {
          id_carrito: carrito.id,
          id_producto: addToCartDto.id_producto,
          cantidad: addToCartDto.cantidad,
        },
        include: {
          producto: true,
        },
      });
    }
  }

  public async updateCartItem(updateDto: UpdateCartItemDto) {
    // Verificar si el producto existe
    const producto = await prisma.productos.findUnique({
      where: { id: updateDto.id_producto },
    });
    if (!producto) throw RequestError.notFound("Producto no encontrado");

    // Verificar stock disponible
    if (producto.stock < updateDto.cantidad) {
      throw RequestError.badRequest("No hay suficiente stock disponible");
    }

    // Actualizar item del carrito
    const item = await prisma.carrito_detalle.findFirst({
      where: {
        id_carrito: updateDto.id_carrito,
        id_producto: updateDto.id_producto,
      },
    });

    if (!item) throw RequestError.notFound("Item no encontrado en el carrito");

    return await prisma.carrito_detalle.update({
      where: { id: item.id },
      data: {
        cantidad: updateDto.cantidad,
      },
      include: {
        producto: true,
      },
    });
  }

  public async removeFromCart(removeDto: RemoveFromCartDto ) {
    const item = await prisma.carrito_detalle.findFirst({
      where: {
        id_carrito: removeDto.id_carrito,
        id_producto: removeDto.id_producto,
      },
    });

    if (!item) throw RequestError.notFound("Item no encontrado en el carrito");

    await prisma.carrito_detalle.delete({
      where: { id: item.id },
    });

    return { message: "Producto eliminado del carrito correctamente" };
  }

  public async clearUserCart(id_usuario: number | undefined) {
    const carrito = await prisma.carrito.findFirst({
      where: { id_usuario },
    });

    if (!carrito) throw RequestError.notFound("Carrito no encontrado");

    await prisma.carrito_detalle.deleteMany({
      where: { id_carrito: carrito.id },
    });

    return { message: "Carrito vaciado correctamente" };
  }
}