import { Request, Response } from "express";
import { AppController } from "./share/AppController";
import { CarritoService } from "../services/carrito.services";
import {
  AddToCartDto,
  UpdateCartItemDto,
  RemoveFromCartDto,
} from "../dtos/carrito.dto";

export class CarritoController extends AppController {
  constructor(private readonly carritoService: CarritoService) {
    super();
  }

  public getCart = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);

    if (!id_usuario || isNaN(id_usuario)) {
      res.status(400).json({ error: "ID de usuario inválido" });
      return;
    }

    try {
      const cart = await this.carritoService.getUserCart(id_usuario);
      res.json(cart);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public addToCart = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);

    if (!id_usuario || isNaN(id_usuario)) {
      res.status(400).json({ error: "ID de usuario inválido" });
      return;
    }

    const [error, addToCartDto] = AddToCartDto.create({
      ...req.body,
      id_usuario, // Inyectamos el id_usuario desde la ruta
    });

    if (error || !addToCartDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const item = await this.carritoService.addToCart(addToCartDto);
      res.status(201).json(item);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public updateCartItem = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);
    const id_carrito = Number(req.params.cartId);
    const id_producto = Number(req.params.productId);

    if ([id_usuario, id_carrito, id_producto].some(isNaN)) {
      res.status(400).json({ error: "Parámetros inválidos" });
      return;
    }

    const [error, updateDto] = UpdateCartItemDto.create({
      ...req.body,
      id_carrito,
      id_producto,
    });

    if (error || !updateDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const item = await this.carritoService.updateCartItem(updateDto);
      res.json(item);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public removeFromCart = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);
    const id_carrito = Number(req.params.cartId);
    const id_producto = Number(req.params.productId);

    if ([id_usuario, id_carrito, id_producto].some(isNaN)) {
      res.status(400).json({ error: "Parámetros inválidos" });
      return;
    }

    const [error, removeDto] = RemoveFromCartDto.create({
      id_carrito,
      id_producto,
    });

    if (error || !removeDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const result = await this.carritoService.removeFromCart(removeDto);
      res.json(result);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public clearCart = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);

    if (!id_usuario || isNaN(id_usuario)) {
      res.status(400).json({ error: "ID de usuario inválido" });
      return;
    }

    try {
      const result = await this.carritoService.clearUserCart(id_usuario);
      res.json(result);
    } catch (error) {
      this.triggerError(error, res);
    }
  };
}