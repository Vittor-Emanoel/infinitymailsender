import { InvalidFileFormatError } from '@/use-cases/errors/invalid-file-format-error'
import { makeImportContactsUseCase } from '@/use-cases/factories/make-import-contacts-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function importContacts(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    //TODO: REFACTORRRR
    try {
        const file = await request.file()
        if (file) {
            const importContactsUseCase = makeImportContactsUseCase()
            await importContactsUseCase.execute(file)
        } else {
            return reply.status(400).send({
                message: 'file is required!',
            })
        }
    } catch (error) {
        if (error instanceof InvalidFileFormatError) {
            return reply.status(400).send({
                message: error.message,
            })
        }
        console.log(error, 'oq deu?')
        return reply.status(500).send({
            message: 'Internal server error.',
        })
    }
}
