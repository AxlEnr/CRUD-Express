import { PrismaClient } from "@prisma/client";
import { bcryptjsAdapter, envs } from "../../config";


export const prisma = new PrismaClient();
export const connectionDB = async () => {
    try {
        prisma.$connect();
        console.log("Base de datos online");
        const { USER_ADMIN, PASSWORD_ADMIN } = envs;
        const existAdmin = await prisma.usuarios.findFirst({ where: { correo: USER_ADMIN } });
        if (!existAdmin) {
            await prisma.usuarios.create({
                data: {
                    correo: USER_ADMIN,
                    contrasena: bcryptjsAdapter.hash(PASSWORD_ADMIN),
                    telefono: "7757505404",
                    rol: "admin",
                    nombre: "MAEBA"
                }
            });
        }
    } catch (error) {
        throw error
    }
}