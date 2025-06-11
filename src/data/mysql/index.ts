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
        
        const categoriasExistentes = await prisma.categorias.findMany({
            where: {
                nombre: {
                    in: ["Hombres", "Mujeres"]
                }
            }
        });

        const nombresExistentes = categoriasExistentes.map(cat => cat.nombre);

        if (!nombresExistentes.includes("Hombres")) {
            await prisma.categorias.create({
                data: { nombre: "Hombres" }
            });
            console.log("Categoría 'Hombres' creada.");
        }

        if (!nombresExistentes.includes("Mujeres")) {
            await prisma.categorias.create({
                data: { nombre: "Mujeres" }
            });
            console.log("Categoría 'Mujeres' creada.");
        }

    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        throw error;
    }
};
