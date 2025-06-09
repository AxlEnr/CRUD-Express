import { Request, Response } from "express";
import { AppController } from "./share/AppController";
import { OrdenDetalleService } from "../services/ordenesDetalles.services";
import { CreateOrderDetailDto, UpdateOrderDetailDto } from "../dtos/ordenesDetalles.dto";

export class OrdenDetalleController extends AppController {
  constructor(private readonly ordenDetalleService: OrdenDetalleService) {
    super();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    const [error, createDto] = CreateOrderDetailDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const detail = await this.ordenDetalleService.createOrderDetail(createDto!);
      res.status(201).json(detail);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const [error, updateDto] = UpdateOrderDetailDto.create({
      ...req.body,
      id: Number(req.params.id),
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const detail = await this.ordenDetalleService.updateOrderDetail(updateDto!);
      res.json(detail);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.ordenDetalleService.deleteOrderDetail(Number(req.params.id));
      res.json(result);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public getByOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const details = await this.ordenDetalleService.getDetailsByOrder(Number(req.params.orderId));
      res.json(details);
    } catch (error) {
      this.triggerError(error, res);
    }
  };
}