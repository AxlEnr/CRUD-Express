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
exports.CarritoController = void 0;
const AppController_1 = require("./share/AppController");
const carrito_dto_1 = require("../dtos/carrito.dto");
class CarritoController extends AppController_1.AppController {
    constructor(carritoService) {
        super();
        this.carritoService = carritoService;
        this.getCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id_usuario = Number(req.params.id_usuario);
            if (!id_usuario || isNaN(id_usuario)) {
                res.status(400).json({ error: "ID de usuario inválido" });
                return;
            }
            try {
                const cart = yield this.carritoService.getUserCart(id_usuario);
                res.json(cart);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.addToCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id_usuario = Number(req.params.id_usuario);
            if (!id_usuario || isNaN(id_usuario)) {
                res.status(400).json({ error: "ID de usuario inválido" });
                return;
            }
            const [error, addToCartDto] = carrito_dto_1.AddToCartDto.create(Object.assign(Object.assign({}, req.body), { id_usuario }));
            if (error || !addToCartDto) {
                res.status(400).json({ error });
                return;
            }
            try {
                const item = yield this.carritoService.addToCart(addToCartDto);
                res.status(201).json(item);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.updateCartItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id_usuario = Number(req.params.id_usuario);
            const id_carrito = Number(req.params.cartId);
            const id_producto = Number(req.params.productId);
            if ([id_usuario, id_carrito, id_producto].some(isNaN)) {
                res.status(400).json({ error: "Parámetros inválidos" });
                return;
            }
            const [error, updateDto] = carrito_dto_1.UpdateCartItemDto.create(Object.assign(Object.assign({}, req.body), { id_carrito,
                id_producto }));
            if (error || !updateDto) {
                res.status(400).json({ error });
                return;
            }
            try {
                const item = yield this.carritoService.updateCartItem(updateDto);
                res.json(item);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.removeFromCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id_usuario = Number(req.params.id_usuario);
            const id_carrito = Number(req.params.cartId);
            const id_producto = Number(req.params.productId);
            if ([id_usuario, id_carrito, id_producto].some(isNaN)) {
                res.status(400).json({ error: "Parámetros inválidos" });
                return;
            }
            const [error, removeDto] = carrito_dto_1.RemoveFromCartDto.create({
                id_carrito,
                id_producto,
            });
            if (error || !removeDto) {
                res.status(400).json({ error });
                return;
            }
            try {
                const result = yield this.carritoService.removeFromCart(removeDto);
                res.json(result);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
        this.clearCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id_usuario = Number(req.params.id_usuario);
            if (!id_usuario || isNaN(id_usuario)) {
                res.status(400).json({ error: "ID de usuario inválido" });
                return;
            }
            try {
                const result = yield this.carritoService.clearUserCart(id_usuario);
                res.json(result);
            }
            catch (error) {
                this.triggerError(error, res);
            }
        });
    }
}
exports.CarritoController = CarritoController;
