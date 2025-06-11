// src/controllers/direccion.controller.ts
import { Request, Response } from "express";
import { AppController } from "./share/AppController";
import { DireccionService } from "../services/direccion.service";
import {
  CreateDireccionDto,
  UpdateDireccionDto,
  GetUserDireccionesDto,
  DeleteDireccionDto,
} from "../dtos/direccion.dto";

export class DireccionController extends AppController {
  constructor(private readonly direccionService: DireccionService) {
    super();
  }

  public getDirecciones = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);

    if (!id_usuario || isNaN(id_usuario)) {
      res.status(400).json({ error: "ID de usuario inválido" });
      return;
    }

    try {
      const direcciones = await this.direccionService.getUserDirecciones(
        id_usuario
      );
      res.json(direcciones);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public createDireccion = async (req: Request, res: Response): Promise<void> => {
    const id_usuario = Number(req.params.id_usuario);

    if (!id_usuario || isNaN(id_usuario)) {
      res.status(400).json({ error: "ID de usuario inválido" });
      return;
    }

    const [error, createDto] = CreateDireccionDto.create({
      ...req.body,
      id_usuario, // Inyectamos el id_usuario desde la ruta
    });

    if (error || !createDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const direccion = await this.direccionService.createDireccion(createDto);
      res.status(201).json(direccion);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public updateDireccion = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID de dirección inválido" });
      return;
    }

    const [error, updateDto] = UpdateDireccionDto.create({
      ...req.body,
      id,
    });

    if (error || !updateDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const direccion = await this.direccionService.updateDireccion(updateDto);
      res.json(direccion);
    } catch (error) {
      this.triggerError(error, res);
    }
  };

  public deleteDireccion = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID de dirección inválido" });
      return;
    }

    const [error, deleteDto] = DeleteDireccionDto.create({
      id,
    });

    if (error || !deleteDto) {
      res.status(400).json({ error });
      return;
    }

    try {
      const result = await this.direccionService.deleteDireccion(deleteDto);
      res.json(result);
    } catch (error) {
      this.triggerError(error, res);
    }
  };
}