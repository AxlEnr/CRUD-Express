import { Request, Response } from "express";
import { AppController } from "./share/AppController";
import { OrdenesService } from "../services/ordenes.services";
import { CreateOrderDto, UpdateOrderStatusDto, GetUserOrdersDto } from "../dtos/ordenes.dto";

export class OrdenesController extends AppController {
  constructor(private readonly ordenesService: OrdenesService) {
    super();
  }

  public createOrder = async (req: Request, res: Response): Promise<void> => {

    const [error, createDto] = CreateOrderDto.create(req.body);
    const userId = req.user?.id
    console.log(userId);
    if (error || !createDto) {
      res.status(400).json({ error });
      return;
    }
    try {
      const order = await this.ordenesService.createOrder(createDto, {id: Number(userId)});
      res.status(201).json(order);
    } catch (error) {
      this.triggerError(error, res);
    }
  };


  public getUserOrders = async (req: Request, res: Response): Promise<void> => {
    const rawId = req.user?.id ?? req.query.id_usuario;
    const id_usuario = Number(rawId); // 🔥 Asegura que sea un número

    if (isNaN(id_usuario)) {
      res.status(400).json({ error: "id_usuario inválido" });
      return;
    }

    const [error, getOrdersDto] = GetUserOrdersDto.create({ id_usuario });

    if (error || !getOrdersDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const orders = await this.ordenesService.getUserOrders(getOrdersDto);
      res.json(orders);
    } catch (error) {
      this.triggerError(error, res);
    }
  };



  public getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await this.ordenesService.getAllOrders();
      res.json(orders);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    const [error, updateDto] = UpdateOrderStatusDto.create({
      ...req.body,
      id: Number(req.params.id),
    });
    if (error || !updateDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const order = await this.ordenesService.updateOrderStatus(updateDto);
      res.json(order);
    } catch (error) {
      this.triggerError(error, res);
    }
  };
}