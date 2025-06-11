// src/services/direccion.services.ts
import { prisma } from "../data";
import { RequestError } from "../errors/RequestErrors";
import {
  CreateDireccionDto,
  UpdateDireccionDto,
  GetUserDireccionesDto,
  DeleteDireccionDto,
} from "../dtos/direccion.dto";

export class DireccionService {
  constructor() {}

  public async getUserDirecciones(id_usuario: number) {
    return await prisma.direcciones.findMany({
      where: { id_usuario },
    });
  }

  public async createDireccion(createDto: CreateDireccionDto) {
    // Verificar si el usuario existe
    const usuario = await prisma.usuarios.findUnique({
      where: { id: createDto.id_usuario },
    });
    if (!usuario) throw RequestError.notFound("Usuario no encontrado");

    return await prisma.direcciones.create({
      data: {
        id_usuario: createDto.id_usuario,
        calle: createDto.calle,
        numero_exterior: createDto.numero_exterior,
        numero_interior: createDto.numero_interior,
        ciudad: createDto.ciudad,
        estado: createDto.estado,
        codigo_postal: createDto.codigo_postal,
        pais: createDto.pais,
      },
    });
  }

  public async updateDireccion(updateDto: UpdateDireccionDto) {
    // Verificar si la dirección existe
    const direccion = await prisma.direcciones.findUnique({
      where: { id: updateDto.id },
    });
    if (!direccion) throw RequestError.notFound("Dirección no encontrada");

    return await prisma.direcciones.update({
      where: { id: updateDto.id },
      data: {
        calle: updateDto.calle,
        numero_exterior: updateDto.numero_exterior,
        numero_interior: updateDto.numero_interior,
        ciudad: updateDto.ciudad,
        estado: updateDto.estado,
        codigo_postal: updateDto.codigo_postal,
        pais: updateDto.pais,
      },
    });
  }

  public async deleteDireccion(deleteDto: DeleteDireccionDto) {
    // Verificar si la dirección existe
    const direccion = await prisma.direcciones.findUnique({
      where: { id: deleteDto.id },
    });
    if (!direccion) throw RequestError.notFound("Dirección no encontrada");

    await prisma.direcciones.delete({
      where: { id: deleteDto.id },
    });

    return { message: "Dirección eliminada correctamente" };
  }
}