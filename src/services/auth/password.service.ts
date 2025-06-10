import { EventEmitter } from 'events';
import { prisma } from '../../data';
import { RequestError } from '../../errors/RequestErrors';
import { bcryptjsAdapter } from '../../config';
import { password } from '../../config/new_password';
import { SearchIdDto } from '../../dtos/share/search-id.dto';

export const passwordEvents = new EventEmitter();

export async function generatePassword(idDto: SearchIdDto) {
    try {
        if (!idDto.id || isNaN(idDto.id)) {
            throw new Error('ID inválido o faltante');
        }

        const user = await prisma.usuarios.findUnique({
            where: { id: idDto.id }
        });

        if (!user) throw RequestError.notFound(`No existe un usuario con el ID ${idDto.id}.`);

        const newPassword = password; // Función que genera una contraseña aleatoria
        const hashedPassword = await bcryptjsAdapter.hash(newPassword);

        await prisma.usuarios.update({
            where: { id: idDto.id },
            data: { contrasena: hashedPassword }
        });

        // 🔥 Emitir evento con la nueva contraseña
        passwordEvents.emit('passwordGenerated', {
            userId: idDto.id,
            newPassword, // Contraseña en texto plano (¡manejar con cuidado!)
            timestamp: new Date()
        });

        return newPassword;
    } catch (error: any) {
        throw new Error(error.message);
    }
}