"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const data_1 = require("../data");
const RequestErrors_1 = require("../errors/RequestErrors");
class ProductoService {
    constructor() { }
    getAllProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_1.prisma.productos.findMany({
                orderBy: { fecha_creacion: "desc" },
            });
        });
    }
    getProductoById(idDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield data_1.prisma.productos.findUnique({
                where: { id: idDto.id },
            });
            if (!producto)
                throw RequestErrors_1.RequestError.notFound("Producto no encontrado");
            return producto;
        });
    }
    getProductosByCategoria(id_categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_1.prisma.productos.findMany({
                where: { id_categoria },
                orderBy: { fecha_creacion: "desc" },
            });
        });
    }
    updateStock(id, nuevoStock) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield data_1.prisma.productos.findUnique({ where: { id } });
            if (!exist)
                throw RequestErrors_1.RequestError.notFound("Producto no encontrado");
            return yield data_1.prisma.productos.update({
                where: { id },
                data: { stock: nuevoStock },
            });
        });
    }
    createProducto(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_1.prisma.productos.create({
                data: createDto,
            });
        });
    }
    updateProducto(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield data_1.prisma.productos.findUnique({
                where: { id: updateDto.id },
            });
            if (!exist)
                throw RequestErrors_1.RequestError.notFound("Producto no encontrado");
            const dataToUpdate = Object.fromEntries(Object.entries(updateDto).filter(([_, v]) => v !== undefined));
            return yield data_1.prisma.productos.update({
                where: { id: updateDto.id },
                data: Object.assign(Object.assign({}, dataToUpdate), { id: undefined }),
            });
        });
    }
    deleteProducto(deleteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield data_1.prisma.productos.findUnique({
                where: { id: deleteDto.id },
            });
            if (!exist)
                throw RequestErrors_1.RequestError.notFound("Producto no encontrado");
            yield data_1.prisma.productos.delete({ where: { id: deleteDto.id } });
            return { message: "Producto eliminado correctamente" };
        });
    }
}
exports.ProductoService = ProductoService;
