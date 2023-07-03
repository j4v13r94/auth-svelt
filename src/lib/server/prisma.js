
import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient()


export const oAUthToDbUser = async (email, name) => {



    try {
        const data = await prisma.user.findUnique({ where: { email } })

        if (data) {
            const { email, name, role, cel } = data
            return { email, name, role, cel }
        }

        const newUser = await prisma.user.create({ data: { email, name } })

        return { email, name, role: newUser.role, cel }

    } catch (error) {
        return null
    }


}