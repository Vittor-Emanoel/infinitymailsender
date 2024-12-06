import { PrismaClient } from '@prisma/client'

//adiciona as query no terminal
export const prisma = new PrismaClient({
    log: ['query'],
})
