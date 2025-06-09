import { PrismaClient } from "@prisma/client";
import { bcryptjsAdapter, envs } from "../../config";

export const prisma = new PrismaClient();

export const connectionDB = async () => {
    try {
        await prisma.$connect();
        console.log("Base de datos online");

        const { USER_ADMIN, PASSWORD_ADMIN } = envs;

        const existAdmin = await prisma.usuarios.findFirst({
            where: { correo: USER_ADMIN }
        });

        if (!existAdmin) {
            await prisma.usuarios.create({
                data: {
                    correo: USER_ADMIN,
                    contrasena: await bcryptjsAdapter.hash(PASSWORD_ADMIN),
                    telefono: "7757505404",
                    rol: "admin",
                    nombre: "MAEBA",
                    apellido: "",
                    edad: ""
                }
            });
            console.log("Usuario admin creado.");
        } else {
            console.log("Usuario admin ya existe.");
        }

    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        throw error;
    }
}
