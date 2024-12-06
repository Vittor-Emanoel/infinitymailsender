import { MultipartFile } from '@fastify/multipart'
import { InvalidFileFormatError } from 'errors/invalid-file-format-error'
import { isXlsxFile } from 'helpers/valid-format-xlsx'
import { IContactRepository } from 'interfaces/contact-interface'
import * as XLSX from 'xlsx'
import { z } from 'zod'

const ContactSchemaRequest = z.object({
    name: z.string(),
    email: z.string().email(),
})

type ContactSchemaRequest = z.infer<typeof ContactSchemaRequest>

export class ImportContactsUseCase {
    constructor(private importContactsRepository: IContactRepository) {}
    async execute(file: MultipartFile) {
        try {
            if (!isXlsxFile(file.mimetype)) {
                throw new InvalidFileFormatError()
            }

            const workbook = XLSX.read(await file.toBuffer(), {
                type: 'buffer',
            })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const contactsToJSON = XLSX.utils
                .sheet_to_json<ContactSchemaRequest>(worksheet)
                .map(row => ({
                    name: row.name,
                    email: row.email,
                }))

            await this.importContactsRepository.createMany(
                contactsToJSON.map(contact => ({
                    name: contact.name,
                    email: contact.email,
                })),
            )
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }
}
