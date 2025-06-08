import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";
import { CreateOrderDetailDto, UpdateOrderDetailDto } from "../dtos/ordenesDetalles.dto";

export class OrdenDetalleService {
  constructor() {}

  public async createOrderDetail(createDto: CreateOrderDetailDto) {
    // Verificar existencia de orden y producto
    const [order, product] = await Promise.all([
      prisma.ordenes.findUnique({ where: { id: createDto.id_orden } }),
      prisma.productos.findUnique({ where: { id: createDto.id_producto } }),
    ]);

    if (!order) throw RequestError.notFound("Orden no encontrada");
    if (!product) throw RequestError.notFound("Producto no encontrado");

    return await prisma.orden_detalle.create({
      data: {
        id_orden: createDto.id_orden,
        id_producto: createDto.id_producto,
        cantidad: createDto.cantidad,
        precio_unitario: createDto.precio_unitario,
      },
      include: {
        producto: true,
      },
    });
  }

  public async updateOrderDetail(updateDto: UpdateOrderDetailDto) {
    const detail = await prisma.orden_detalle.findUnique({
      where: { id: updateDto.id },
    });

    if (!detail) throw RequestError.notFound("Detalle no encontrado");

    return await prisma.orden_detalle.update({
      where: { id: updateDto.id },
      data: {
        cantidad: updateDto.cantidad,
        precio_unitario: updateDto.precio_unitario,
      },
      include: {
        producto: true,
      },
    });
  }

  public async deleteOrderDetail(id: number) {
    const detail = await prisma.orden_detalle.findUnique({
      where: { id },
    });

    if (!detail) throw RequestError.notFound("Detalle no encontrado");

    await prisma.orden_detalle.delete({ where: { id } });

    return { message: "Detalle eliminado correctamente" };
  }

  public async getDetailsByOrder(id_orden: number) {
    return await prisma.orden_detalle.findMany({
      where: { id_orden },
      include: {
        producto: true,
      },
    });
  }
}