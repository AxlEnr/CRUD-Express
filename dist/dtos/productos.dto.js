"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductoDto = exports.UpdateProductoDto = exports.CreateProductoDto = void 0;
const config_1 = require("../config");
class CreateProductoDto {
    constructor(nombre, descripcion, precio, stock, marca, capacidad, id_categoria, imagen_url) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.marca = marca;
        this.capacidad = capacidad;
        this.id_categoria = id_categoria;
        this.imagen_url = imagen_url;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("nombre", "precio", "stock");
            validators.minLength("nombre", 1);
            validators.maxLength("nombre", 20);
            validators.isDecimal("precio");
            validators.isInteger("stock");
            if (data.marca)
                validators.maxLength("marca", 20);
            if (data.capacidad !== undefined)
                validators.isInteger("capacidad");
            if (data.id_categoria !== undefined)
                validators.isInteger("id_categoria");
            if (data.imagen_url)
                validators.maxLength("imagen_url", 100);
            validators.capitalizar("nombre");
            const { nombre, descripcion = null, precio, stock, marca = null, capacidad = null, id_categoria = null, imagen_url = null, } = validators.data;
            return [undefined, new CreateProductoDto(nombre, descripcion, parseFloat(precio), parseInt(stock), marca, capacidad !== null ? parseInt(capacidad) : null, id_categoria !== null ? parseInt(id_categoria) : null, imagen_url)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateProductoDto = CreateProductoDto;
class UpdateProductoDto {
    constructor(id, nombre, descripcion, precio, stock, marca, capacidad, id_categoria, imagen_url) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.marca = marca;
        this.capacidad = capacidad;
        this.id_categoria = id_categoria;
        this.imagen_url = imagen_url;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");
            if (data.nombre) {
                validators.maxLength("nombre", 20);
                validators.capitalizar("nombre");
            }
            if (data.precio !== undefined)
                validators.isDecimal("precio");
            if (data.stock !== undefined)
                validators.isInteger("stock");
            if (data.marca !== undefined)
                validators.maxLength("marca", 20);
            if (data.capacidad !== undefined)
                validators.isInteger("capacidad");
            if (data.id_categoria !== undefined)
                validators.isInteger("id_categoria");
            if (data.imagen_url !== undefined)
                validators.maxLength("imagen_url", 100);
            const { id, nombre, descripcion = null, precio, stock, marca = null, capacidad = null, id_categoria = null, imagen_url = null } = validators.data;
            return [undefined, new UpdateProductoDto(parseInt(id), nombre, descripcion, precio !== undefined ? parseFloat(precio) : undefined, stock !== undefined ? parseInt(stock) : undefined, marca, capacidad, id_categoria, imagen_url)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateProductoDto = UpdateProductoDto;
class DeleteProductoDto {
    constructor(id) {
        this.id = id;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");
            const { id } = validators.data;
            return [undefined, new DeleteProductoDto(parseInt(id))];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.DeleteProductoDto = DeleteProductoDto;
