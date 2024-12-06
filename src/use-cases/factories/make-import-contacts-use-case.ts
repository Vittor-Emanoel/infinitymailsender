import { ContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { ImportContactsUseCase } from '@/use-cases/import-contacts'

export function makeImportContactsUseCase() {
    const importContactsRepository = new ContactRepository()
    const importContactsUseCase = new ImportContactsUseCase(
        importContactsRepository,
    )

    return importContactsUseCase
}
