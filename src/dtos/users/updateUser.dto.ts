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
        public readonly rol?: string
    ) {}

    public static create(data: DynamicObject, isPatch = false): [string?, UpdateUserDto?] {
        try {
            const validators = new Validators(data);

            // Validaciones condicionales para PATCH
            if (!isPatch) {
                validators.requiredKeys(
                    "nombre",
                    "apellido",
                    "edad",
                    "correo",
                    "telefono",
                    "contrasena",
                    "rol"
                );
            }

            // Validaciones solo para campos presentes (PATCH) o todos (PUT)
            if (data.nombre !== undefined) {
                validators.isString("nombre");
                validators.capitalizar("nombre");
            }

            if (data.apellido !== undefined) {
                validators.isString("apellido");
                validators.capitalizar("apellido");
            }

            if (data.contrasena !== undefined) {
                validators.isString("contrasena");
                validators.checkLength("contrasena", 6, 100);
            }

            if (data.edad !== undefined) {
                validators.isString("edad");
                validators.checkLength("edad", 1, 3);
            }

            if (data.correo !== undefined) {
                validators.isEmail("correo");
                validators.checkLength("correo", 5, 60);
            }

            if (data.telefono !== undefined) {
                validators.isPhoneNumber("telefono");
                validators.checkLength("telefono", 10, 15);
            }

            if (data.rol !== undefined) {
                validators.isString("rol");
            }

            return [undefined, new UpdateUserDto(
                data.nombre,
                data.apellido,
                data.edad,
                data.correo,
                data.telefono,
                data.contrasena,
                data.rol
            )];
        } catch (error: any) {
            return [error as string, undefined];
        }
    }
}