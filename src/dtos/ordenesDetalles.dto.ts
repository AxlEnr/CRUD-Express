import { Validators } from "../config";
import { DynamicObject } from "./share/DynamicObject";

export class CreateOrderDetailDto {
  private constructor(
    public readonly id_orden: number,
    public readonly id_producto: number,
    public readonly cantidad: number,
    public readonly precio_unitario: number
  ) {}

  static create(data: DynamicObject): [string?, CreateOrderDetailDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_orden", "id_producto", "cantidad", "precio_unitario");
      validators.isInteger("id_orden");
      validators.isInteger("id_producto");
      validators.isPositive("cantidad");
      validators.isDecimal("precio_unitario");

      const { id_orden, id_producto, cantidad, precio_unitario } = data;

      return [
        undefined,
        new CreateOrderDetailDto(
          Number(id_orden),
          Number(id_producto),
          Number(cantidad),
          Number(precio_unitario)
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class UpdateOrderDetailDto {
  private constructor(
    public readonly id: number,
    public readonly cantidad?: number,
    public readonly precio_unitario?: number
  ) {}

  static create(data: DynamicObject): [string?, UpdateOrderDetailDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id");
      validators.isInteger("id");
      if (data.cantidad) validators.isPositive("cantidad");
      if (data.precio_unitario) validators.isDecimal("precio_unitario");

      const { id, cantidad, precio_unitario } = data;

      return [
        undefined,
        new UpdateOrderDetailDto(
          Number(id),
          cantidad ? Number(cantidad) : undefined,
          precio_unitario ? Number(precio_unitario) : undefined
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}