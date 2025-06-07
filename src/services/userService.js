const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
  async getUsers() {
    try {
      const profesores = await prisma.usuarios.findMany({
        select: {
          nombre: true,
          correo: true,
          contrasena: true
        },
      });
      return { profesores };
    } catch (error) {
      console.error("Error en UserService:", error);
      throw error;
    }
  }
}

module.exports = UserService;