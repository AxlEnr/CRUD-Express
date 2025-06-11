// src/dtos/direccion.dto.ts
import { Validators } from "../config";
import { DynamicObject } from "./share/DynamicObject";

export class CreateDireccionDto {
  private constructor(
    public readonly id_usuario: number,
    public readonly calle: string,
    public readonly numero_exterior: string | null,
    public readonly numero_interior: string | null,
    public readonly ciudad: string,
    public readonly estado: string,
    public readonly codigo_postal: string,
    public readonly pais: string
  ) {}

  static create(data: DynamicObject): [string?, CreateDireccionDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys(
        "id_usuario",
        "calle",
        "ciudad",
        "estado",
        "codigo_postal",
        "pais"
      );
      validators.isInteger("id_usuario");
      validators.isString("calle");
      validators.isString("numero_exterior");
      validators.isString("numero_interior");
      validators.isString("ciudad");
      validators.isString("estado");
      validators.isString("codigo_postal");
      validators.isString("pais");

      const {
        id_usuario,
        calle,
        numero_exterior,
        numero_interior,
        ciudad,
        estado,
        codigo_postal,
        pais,
      } = validators.data;

      return [
        undefined,
        new CreateDireccionDto(
          parseInt(id_usuario),
          calle,
          numero_exterior || null,
          numero_interior || null,
          ciudad,
          estado,
          codigo_postal,
          pais
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class UpdateDireccionDto {
  private constructor(
    public readonly id: number,
    public readonly calle: string,
    public readonly numero_exterior: string | null,
    public readonly numero_interior: string | null,
    public readonly ciudad: string,
    public readonly estado: string,
    public readonly codigo_postal: string,
    public readonly pais: string
  ) {}

  static create(data: DynamicObject): [string?, UpdateDireccionDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys(
        "id",
        "calle",
        "ciudad",
        "estado",
        "codigo_postal",
        "pais"
      );
      validators.isInteger("id");
      validators.isString("calle");
      validators.isString("numero_exterior");
      validators.isString("numero_interior");
      validators.isString("ciudad");
      validators.isString("estado");
      validators.isString("codigo_postal");
      validators.isString("pais");

      const {
        id,
        calle,
        numero_exterior,
        numero_interior,
        ciudad,
        estado,
        codigo_postal,
        pais,
      } = validators.data;

      return [
        undefined,
        new UpdateDireccionDto(
          parseInt(id),
          calle,
          numero_exterior || null,
          numero_interior || null,
          ciudad,
          estado,
          codigo_postal,
          pais
        ),
      ];
    } catch (error) {
      return [error as string];
    }
  }
}

export class GetUserDireccionesDto {
  private constructor(public readonly id_usuario: number) {}

  static create(data: DynamicObject): [string?, GetUserDireccionesDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id_usuario");
      validators.isInteger("id_usuario");

      const { id_usuario } = validators.data;

      return [undefined, new GetUserDireccionesDto(parseInt(id_usuario))];
    } catch (error) {
      return [error as string];
    }
  }
}

export class DeleteDireccionDto {
  private constructor(public readonly id: number) {}

  static create(data: DynamicObject): [string?, DeleteDireccionDto?] {
    try {
      const validators = new Validators(data);
      validators.requiredKeys("id");
      validators.isInteger("id");

      const { id } = validators.data;

      return [undefined, new DeleteDireccionDto(parseInt(id))];
    } catch (error) {
      return [error as string];
    }
  }
}