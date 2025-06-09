import { Validators } from "../../config";
import { DynamicObject } from "../share/DynamicObject";

export class CreateUserDto {
  private constructor (
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly edad: string,
    public readonly correo: string,
    public readonly contrasena: string,
    public readonly telefono: string,
    public readonly rol: string,
    public readonly fecha_registro: Date,
  ) {}

  static create(data: DynamicObject): [string?, CreateUserDto?] {
    try {
        const validators = new Validators(data);
        validators.requiredKeys(
          "nombre",
          "apellido",
          "edad",
          "correo",
          "contrasena",
          "telefono",
          "rol",
          "fecha_registro",
        );

        validators.isString("nombre");
        validators.isString("apellido");
        validators.isString("contrasena");
        validators.isString("edad");
        validators.isDate("fecha_registro");
        validators.isEmail("correo");
        validators.isPhoneNumber("telefono");
        validators.capitalizar("nombre");
        validators.capitalizar("apellido");
        validators.checkLength("contrasena", 6, 100);
        validators.checkLength("telefono", 10, 15);
        validators.checkLength("rol", 3, 20);
        validators.checkLength("correo", 5, 60);
        validators.checkLength("edad", 1, 3);
        validators.ifExistIsEmail("correo");
        validators.checkValues("rol", ["admin", "cliente"]);

        const { nombre, apellido, edad, correo, contrasena, telefono, rol, fecha_registro } = validators.data;
        return [undefined, new CreateUserDto(
          nombre,
          apellido,
          edad,
          correo,
          contrasena,
          telefono,
          rol,
          new Date(fecha_registro),
        )];
    } catch (error: any) {
        return [error as string, undefined];
    }
  }
}
