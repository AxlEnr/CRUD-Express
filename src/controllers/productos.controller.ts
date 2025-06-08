import { Request, Response, NextFunction } from "express";
import { AppController } from "./share/AppController";
import { ProductoService } from "../services/productos.service";
import { CreateProductoDto, UpdateProductoDto, DeleteProductoDto } from "../dtos/prodcuts/productos.dto";

export class ProductoController extends AppController {
    constructor(
        private readonly productoService: ProductoService
    ) { super(); }

    public getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.productoService.getAllProductos();
            res.json(data); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const data = await this.productoService.getProductoById({ id: Number(req.params.id) });
            res.json(data);
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public getProductosByCategoria = async (req: Request, res: Response) => {
        try {
            const data = await this.productoService.getProductosByCategoria(Number(req.params.categoriaId));
            res.json(data); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public create = async (req: Request, res: Response) => {
        const [error, createDto] = CreateProductoDto.create(req.body);
        if (error || !createDto) {
            res.status(400).json({ error });
            return; // Solo return para salir temprano
        }

        try {
            const data = await this.productoService.createProducto(createDto);
            res.status(201).json(data); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public update = async (req: Request, res: Response) => {
        const [error, updateDto] = UpdateProductoDto.create({ ...req.body, id: Number(req.params.id) });
        if (error || !updateDto) {
            res.status(400).json({ error });
            return; // Solo return para salir temprano
        }

        try {
            const data = await this.productoService.updateProducto(updateDto);
            res.json(data); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public updateStock = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const stock = Number(req.body.stock);
            const data = await this.productoService.updateStock(id, stock);
            res.json(data); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }

    public delete = async (req: Request, res: Response) => {
        const [error, deleteDto] = DeleteProductoDto.create({ id: Number(req.params.id) });
        if (error || !deleteDto) {
            res.status(400).json({ error });
            return; // Solo return para salir temprano
        }

        try {
            const result = await this.productoService.deleteProducto(deleteDto);
            res.json(result); // No return necesario
        } catch (error) {
            this.triggerError(error, res);
        }
    }
}