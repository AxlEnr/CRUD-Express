import { PrismaClient, usuarios_rol } from "@prisma/client";
import { SearchIdDto } from "../dtos/share/search-id.dto";
import { RequestError } from "../errors/RequestErrors";
import { CreateUserDto, UpdateUserDto } from "../dtos/index.dto";
import { bcryptjsAdapter } from "../config";

const prisma = new PrismaClient();

export class UserService {
  constructor () {}

  public async getAllUsers() {
    try {
      return await prisma.usuarios.findMany();
    } catch (error) {
      console.error("Error en UserService:", error);
      throw error;
    }
  }

  public async getUserById(idDto: SearchIdDto) {
    try {
      const user = await prisma.usuarios.findUnique({
        where: { id: idDto.id }
      });

      if (!user){
        throw RequestError.notFound(`El usuario con el id ${idDto.id} no existe.`);
      }

      return user;
    } catch (error: any) {
      console.error("Error en UserService:", error);
      throw error;
    }
  }

  public async getUserInfo(idDto: SearchIdDto) {
    try {
      if (!idDto.id || isNaN(idDto.id)) {
        throw new Error('ID inválido o faltante');
      }

      const user = await prisma.usuarios.findUnique({
        where: { id: idDto.id }
      });

      return user;
    } catch (error: any) {
      console.error("Error en UserService:", error.message);
      throw error;
    }
  }


  public async createUser(createUser: CreateUserDto) {
    try{
      const emailExists = await prisma.usuarios.findUnique({
          where: { correo: createUser.correo }
        });

      if (emailExists) {
        throw RequestError.badRequest(`El correo ${createUser.correo} ya está en uso.`);
      }

      const passwordHash = await bcryptjsAdapter.hash(createUser.contrasena);
      const { contrasena: registeredPassword, ...newUser } = await prisma.usuarios.create({
        data: {
          ...createUser,
          contrasena: passwordHash,
          rol: createUser.rol as usuarios_rol,
        },
      });

      return newUser;
    } catch (error: any){
      console.error("Error en UserService:", error);
      throw error;
    } 
  }

  public async updateUser(idDto: SearchIdDto, updateUser: UpdateUserDto) {
    try {
        const userExists = await prisma.usuarios.findUnique({
            where: { id: idDto.id }
        });
        
        if (!userExists) {
            throw RequestError.notFound(`El usuario con id ${idDto.id} no existe.`);
        }

        // Filtrar campos undefined y procesar contraseña
        const updateData: any = {};
        
        if (updateUser.nombre !== undefined) updateData.nombre = updateUser.nombre;
        if (updateUser.apellido !== undefined) updateData.apellido = updateUser.apellido;
        if (updateUser.edad !== undefined) updateData.edad = updateUser.edad;
        if (updateUser.correo !== undefined) updateData.correo = updateUser.correo;
        if (updateUser.telefono !== undefined) updateData.telefono = updateUser.telefono;
        if (updateUser.rol !== undefined) updateData.rol = updateUser.rol as usuarios_rol;
        
        if (updateUser.contrasena !== undefined) {
            updateData.contrasena = await bcryptjsAdapter.hash(updateUser.contrasena);
        }

        const { contrasena, ...userData } = await prisma.usuarios.update({
            where: { id: idDto.id },
            data: updateData
        });

        return userData;
    } catch (error: any) {
        console.error("Error en UserService:", error);
        throw error;
    }
}

  public async deleteUser(idDto: SearchIdDto) {
    try {
      const userExists = await prisma.usuarios.findUnique({
        where: { id: idDto.id }
      });
      if (!userExists) {
        throw RequestError.notFound(`El usuario con el ID ${idDto.id} no existe.`);
      }
      await prisma.usuarios.delete({
        where: { id: idDto.id }
      });

      return `Usuario con ID ${idDto.id} eliminado correctamente.`;
    } catch (error: any){
      return (error as String || "Error al eliminar el usuario");
    }
  }

  public async authenticateUser(email: string, password: string) {
    if (!email) throw new Error("El email es obligatorio");
    const user = await prisma.usuarios.findUnique({
      where: { correo: email }
    });

    if (!user) throw RequestError.notFound(`No existe un usuario con el correo ${email}.`);

    const isValid = await bcryptjsAdapter.compare(password, user.contrasena);

    if (!isValid) throw RequestError.unauthorized("La contraseña ingresada es incorrecta."); 

    return user;
  }
}
