import { Validators } from "../../config";
import { DynamicObject } from "../share/DynamicObject";

export class CreateProductoDto {
    private constructor(
        public readonly nombre: string,
        public readonly descripcion: string | null,
        public readonly precio: number,
        public readonly stock: number,
        public readonly marca: string | null,
        public readonly capacidad: number | null,
        public readonly id_categoria: number | null,
        public readonly imagen_url: string | null,
    ) {}

    static create(data: DynamicObject): [string?, CreateProductoDto?] {
        try {
            const validators = new Validators(data);

            validators.requiredKeys("nombre", "precio", "stock");

            validators.minLength("nombre", 1);
            validators.maxLength("nombre", 20);
            validators.isDecimal("precio");
            validators.isInteger("stock");

            if (data.marca) validators.maxLength("marca", 20);
            if (data.capacidad !== undefined) validators.isInteger("capacidad");
            if (data.id_categoria !== undefined) validators.isInteger("id_categoria");
            if (data.imagen_url) validators.maxLength("imagen_url", 100);

            validators.capitalizar("nombre");

            const {
                nombre,
                descripcion = null,
                precio,
                stock,
                marca = null,
                capacidad = null,
                id_categoria = null,
                imagen_url = null,
            } = validators.data;

            return [undefined, new CreateProductoDto(
                nombre, descripcion, parseFloat(precio), parseInt(stock),
                marca, capacidad !== null ? parseInt(capacidad) : null,
                id_categoria !== null ? parseInt(id_categoria) : null,
                imagen_url
            )];
        } catch (error) {
            return [error as string];
        }
    }
}

export class UpdateProductoDto {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly descripcion?: string | null,
        public readonly precio?: number,
        public readonly stock?: number,
        public readonly marca?: string | null,
        public readonly capacidad?: number | null,
        public readonly id_categoria?: number | null,
        public readonly imagen_url?: string | null,
    ) {}

    static create(data: DynamicObject): [string?, UpdateProductoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");

            if (data.nombre) {
                validators.maxLength("nombre", 20);
                validators.capitalizar("nombre");
            }

            if (data.precio !== undefined) validators.isDecimal("precio");
            if (data.stock !== undefined) validators.isInteger("stock");
            if (data.marca !== undefined) validators.maxLength("marca", 20);
            if (data.capacidad !== undefined) validators.isInteger("capacidad");
            if (data.id_categoria !== undefined) validators.isInteger("id_categoria");
            if (data.imagen_url !== undefined) validators.maxLength("imagen_url", 100);

            const {
                id,
                nombre,
                descripcion = null,
                precio,
                stock,
                marca = null,
                capacidad = null,
                id_categoria = null,
                imagen_url = null
            } = validators.data;

            return [undefined, new UpdateProductoDto(
                parseInt(id), nombre, descripcion, precio !== undefined ? parseFloat(precio) : undefined,
                stock !== undefined ? parseInt(stock) : undefined,
                marca, capacidad, id_categoria, imagen_url
            )];
        } catch (error) {
            return [error as string];
        }
    }
}

export class DeleteProductoDto {
    private constructor(
        public readonly id: number
    ) {}

    static create(data: DynamicObject): [string?, DeleteProductoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");

            const { id } = validators.data;

            return [undefined, new DeleteProductoDto(parseInt(id))];
        } catch (error) {
            return [error as string];
        }
    }
}
