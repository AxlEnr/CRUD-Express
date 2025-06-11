import { Validators } from "../config";
import { DynamicObject } from "./share/DynamicObject";
import { ordenes_estado } from "@prisma/client";

export class CreateOrderDto {
  private constructor(
    public readonly id_direccion: number,
    public readonly items: Array<{
      id_producto: number;
      cantidad: number;
      precio_unitario: number;
    }>
  ) {}

  static create(data: DynamicObject): [string?, CreateOrderDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_direccion", "items");
      validators.isInteger("id_direccion");
      validators.isArray("items");

      const { id_direccion, items } = data;

      // Validar cada item
      items.forEach((item: any) => {
        if (!item.id_producto || !item.cantidad) {
          throw "Cada item debe tener id_producto y cantidad";
        }
      });

      return [
        undefined,
        new CreateOrderDto(
          Number(id_direccion),
          items.map((item: any) => ({
            id_producto: Number(item.id_producto),
            cantidad: Number(item.cantidad),
            precio_unitario: Number(item.precio_unitario) || 0,
          }))
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class UpdateOrderStatusDto {
  private constructor(
    public readonly id: number,
    public readonly estado: ordenes_estado
  ) {}

  static create(data: DynamicObject): [string?, UpdateOrderStatusDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id", "estado");
      validators.isInteger("id");
      validators.includes("estado", [
        "pendiente",
        "pagado",
        "enviado",
        "entregado",
        "cancelado",
      ]);

      const { id, estado } = data;

      return [undefined, new UpdateOrderStatusDto(Number(id), estado)];
    } catch (error) {
      return [error as string];
    }
  }
}

export class GetUserOrdersDto {
  private constructor(public readonly id_usuario: number) {}

  static create(data: DynamicObject): [string?, GetUserOrdersDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_usuario");
      validators.isInteger("id_usuario");

      const { id_usuario } = data;

      return [undefined, new GetUserOrdersDto(Number(id_usuario))];
    } catch (error) {
      return [error as string];
    }
  }
}