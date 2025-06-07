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
exports.ProductoController = void 0;
const AppController_1 = require("./share/AppController");
const productos_dto_1 = require("../dtos/productos.dto");
class ProductoController extends AppController_1.AppController {
    constructor(productoService) {
        super();
        this.productoService = productoService;
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productoService.getAllProductos();
                res.json(data); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productoService.getProductoById({ id: Number(req.params.id) });
                res.json(data);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.getProductosByCategoria = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productoService.getProductosByCategoria(Number(req.params.categoriaId));
                res.json(data); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createDto] = productos_dto_1.CreateProductoDto.create(req.body);
            if (error || !createDto) {
                res.status(400).json({ error });
                return; // Solo return para salir temprano
            }
            try {
                const data = yield this.productoService.createProducto(createDto);
                res.status(201).json(data); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, updateDto] = productos_dto_1.UpdateProductoDto.create(Object.assign(Object.assign({}, req.body), { id: Number(req.params.id) }));
            if (error || !updateDto) {
                res.status(400).json({ error });
                return; // Solo return para salir temprano
            }
            try {
                const data = yield this.productoService.updateProducto(updateDto);
                res.json(data); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.updateStock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const stock = Number(req.body.stock);
                const data = yield this.productoService.updateStock(id, stock);
                res.json(data); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, deleteDto] = productos_dto_1.DeleteProductoDto.create({ id: Number(req.params.id) });
            if (error || !deleteDto) {
                res.status(400).json({ error });
                return; // Solo return para salir temprano
            }
            try {
                const result = yield this.productoService.deleteProducto(deleteDto);
                res.json(result); // No return necesario
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
    }
}
exports.ProductoController = ProductoController;
