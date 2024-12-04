export type Contact = {
    id: string
    identifier: string
    email: string
    subscribed: boolean
}

export interface IContactRepository {
    createMany: (
        contacts: Omit<Contact, 'id' | 'subscribed'>[],
    ) => Promise<void>
    changeSubscription: (
        contactId: string,
        subscribed: boolean,
    ) => Promise<void>
    findById: (contactId: string) => Promise<Contact | null>
    findByEmail: (contactEmail: string) => Promise<Contact | null>
    listAll: () => Promise<Contact[]>
    delete: (contactId: string) => Promise<void>
}
