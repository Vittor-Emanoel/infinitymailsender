import { IContactRepository } from 'interfaces/contact-interface'

interface IImportContactsUseCaseRequest {
    name: string
    identifier: string //TODO: alterar isso aqui
}

export class ImportContactsUseCase {
    constructor(private importContactsRepository: IContactRepository) {}
    async execute(data: IImportContactsUseCaseRequest[]) {
        //buscar

        await this.importContactsRepository.createMany(
            data.map(contact => ({
                email: contact.identifier,
                identifier: contact.name,
            })),
        )
    }
}
