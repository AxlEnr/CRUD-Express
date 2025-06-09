// src/dtos/carrito.dto.ts
import { Validators } from "../config";
import { DynamicObject } from "./share/DynamicObject";

export class AddToCartDto {
  private constructor(
    public readonly id_usuario: number,
    public readonly id_producto: number,
    public readonly cantidad: number
  ) {}

  static create(data: DynamicObject): [string?, AddToCartDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_usuario", "id_producto", "cantidad");
      validators.isInteger("id_usuario");
      validators.isInteger("id_producto");
      validators.isInteger("cantidad");
      validators.isPositive("cantidad");

      const { id_usuario, id_producto, cantidad } = validators.data;

      return [
        undefined,
        new AddToCartDto(
          parseInt(id_usuario),
          parseInt(id_producto),
          parseInt(cantidad)
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class UpdateCartItemDto {
  private constructor(
    public readonly id_carrito: number,
    public readonly id_producto: number,
    public readonly cantidad: number
  ) {}

  static create(data: DynamicObject): [string?, UpdateCartItemDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_carrito", "id_producto", "cantidad");
      validators.isInteger("id_carrito");
      validators.isInteger("id_producto");
      validators.isInteger("cantidad");
      validators.isPositive("cantidad");

      const { id_carrito, id_producto, cantidad } = validators.data;

      return [
        undefined,
        new UpdateCartItemDto(
          parseInt(id_carrito),
          parseInt(id_producto),
          parseInt(cantidad)
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class RemoveFromCartDto {
  private constructor(
    public readonly id_carrito: number,
    public readonly id_producto: number
  ) {}

  static create(data: DynamicObject): [string?, RemoveFromCartDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_carrito", "id_producto");
      validators.isInteger("id_carrito");
      validators.isInteger("id_producto");

      const { id_carrito, id_producto } = validators.data;

      return [
        undefined,
        new RemoveFromCartDto(parseInt(id_carrito), parseInt(id_producto)),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class GetUserCartDto {
  private constructor(public readonly id_usuario: number) {}

  static create(data: DynamicObject): [string?, GetUserCartDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_usuario");
      validators.isInteger("id_usuario");

      const { id_usuario } = validators.data;

      return [undefined, new GetUserCartDto(parseInt(id_usuario))];
    } catch (error) {
      return [error as string];
    }
  }
}