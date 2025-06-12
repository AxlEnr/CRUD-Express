import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  GetUserOrdersDto,
} from "../dtos/ordenes.dto";
import { ordenes_estado } from "@prisma/client";
import { SearchIdDto } from "../dtos/share/search-id.dto";

export class OrdenesService {
  constructor() {}

  public async createOrder(createDto: CreateOrderDto, idDto: SearchIdDto) {
    // Calcular total
    const total = createDto.items.reduce(
      (sum, item) => sum + item.precio_unitario * item.cantidad,
      0
    );

    // Crear orden
    const orden = await prisma.ordenes.create({
      data: {
        id_usuario: idDto.id,
        id_direccion: createDto.id_direccion,
        total,
        estado: "pendiente",
        detalles: {
          create: createDto.items.map((item) => ({
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
          })),
        },
      },
      include: {
        detalles: true,
        direccion: true,
      },
    });

    // Actualizar stock (opcional, depende de tu lógica)
    for (const item of createDto.items) {
      await prisma.productos.update({
        where: { id: item.id_producto },
        data: { stock: { decrement: item.cantidad } },
      });
    }

    return orden;
  }

  public async getUserOrders(getOrdersDto: GetUserOrdersDto) {
    return await prisma.ordenes.findMany({
      where: { id_usuario: getOrdersDto.id_usuario },
      orderBy: { fecha_creacion: "desc" },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  public async getAllOrders() {
    return await prisma.ordenes.findMany({
      orderBy: { fecha_creacion: "desc" },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
          },
        },
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  public async updateOrderStatus(updateDto: UpdateOrderStatusDto) {
    const orden = await prisma.ordenes.findUnique({
      where: { id: updateDto.id },
    });

    if (!orden) throw RequestError.notFound("Orden no encontrada");

    return await prisma.ordenes.update({
      where: { id: updateDto.id },
      data: { estado: updateDto.estado },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }
}