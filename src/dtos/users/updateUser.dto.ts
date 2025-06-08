import { Validators } from "../../config";
import { DynamicObject } from "../share/DynamicObject";

export class UpdateUserDto {
    constructor(
        public readonly nombre?: string,
        public readonly apellido?: string,
        public readonly edad?: string,
        public readonly correo?: string,
        public readonly telefono?: string,
        public readonly contrasena?: string,
    ) {}

    public static create(data: DynamicObject, isPatch = false): [string?, UpdateUserDto?] {
        try {
            const validators = new Validators(data);

            //PERMITE PUT Y PATCH
            if (!isPatch) {
                validators.requiredKeys(
                    "nombre",
                    "apellido",
                    "edad",
                    "correo",
                    "telefono",
                    "fecha_registro",
                    "contrasena",
                );
            }
            

            validators.isString("nombre");
            validators.isString("apellido");
            validators.isString("contrasena");
            validators.isNumber("edad");
            validators.isDate("fecha_registro");
            validators.isEmail("correo");
            validators.isPhoneNumber("telefono");
            validators.capitalizar("nombre");
            validators.capitalizar("apellido");
            validators.checkLength("contrasena", 6, 100);
            validators.checkLength("telefono", 10, 15);
            validators.checkLength("correo", 5, 60);
            validators.checkLength("edad", 1, 3);
            validators.checkLength("fecha_registro", 10, 10);

            const { nombre, apellido, contrasena, edad, correo, telefono, rol } = validators.data;
            return [undefined, new UpdateUserDto(
                nombre,
                apellido,
                edad.toString(),
                correo,
                telefono,
                contrasena,
            )]
        } catch (error: any) {
            return [error as string, undefined];
        }
    }
}