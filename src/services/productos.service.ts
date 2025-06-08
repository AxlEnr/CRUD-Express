import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";
import { CreateProductoDto, UpdateProductoDto, DeleteProductoDto } from "../dtos/prodcuts/productos.dto";
import { SearchIdDto } from "../dtos/share/search-id.dto";

export class ProductoService {
  constructor() { }

  public async getAllProductos() {
    return await prisma.productos.findMany({
      orderBy: { fecha_creacion: "desc" },
    });
  }

  public async getProductoById(idDto: SearchIdDto) {
    const producto = await prisma.productos.findUnique({
      where: { id: idDto.id },
    });

    if (!producto) throw RequestError.notFound("Producto no encontrado");

    return producto;
  }

  public async getProductosByCategoria(id_categoria: number) {
    return await prisma.productos.findMany({
      where: { id_categoria },
      orderBy: { fecha_creacion: "desc" },
    });
  }

  public async updateStock(id: number, nuevoStock: number) {
    const exist = await prisma.productos.findUnique({ where: { id } });
    if (!exist) throw RequestError.notFound("Producto no encontrado");

    return await prisma.productos.update({
      where: { id },
      data: { stock: nuevoStock },
    });
  }

  public async createProducto(createDto: CreateProductoDto) {
    return await prisma.productos.create({
      data: createDto,
    });
  }

  public async updateProducto(updateDto: UpdateProductoDto) {
    const exist = await prisma.productos.findUnique({
      where: { id: updateDto.id },
    });

    if (!exist) throw RequestError.notFound("Producto no encontrado");

    const dataToUpdate = Object.fromEntries(
      Object.entries(updateDto).filter(([_, v]) => v !== undefined)
    );

    return await prisma.productos.update({
      where: { id: updateDto.id },
      data: {
        ...dataToUpdate,
        id: undefined,
      },
    });
  }

  public async deleteProducto(deleteDto: DeleteProductoDto) {
    const exist = await prisma.productos.findUnique({
      where: { id: deleteDto.id },
    });

    if (!exist) throw RequestError.notFound("Producto no encontrado");

    await prisma.productos.delete({ where: { id: deleteDto.id } });

    return { message: "Producto eliminado correctamente" };
  }
}