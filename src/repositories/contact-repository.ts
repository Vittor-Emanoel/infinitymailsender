import { prisma } from 'database/prisma-client'
import { Contact, IContactRepository } from 'interfaces/contact-interface'

export class ContactRepository implements IContactRepository {
    async createMany(contacts: Omit<Contact, 'id' | 'subscribed'>[]) {
        await prisma.contact.createMany({
            data: contacts.map(contact => ({
                identifier: contact.identifier,
                email: contact.email,
            })),
        })
    }

    async changeSubscription(contactId: string, subscribed: boolean) {
        await prisma.contact.update({
            where: {
                id: contactId,
            },
            data: {
                subscribed: subscribed,
            },
        })
    }

    async findById(contactId: string) {
        return await prisma.contact.findUnique({
            where: {
                id: contactId,
            },
            select: {
                id: true,
                email: true,
                identifier: true,
                subscribed: true,
            },
        })
    }

    async findByEmail(contactEmail: string) {
        return await prisma.contact.findUnique({
            where: {
                email: contactEmail,
            },
            select: {
                id: true,
                email: true,
                identifier: true,
                subscribed: true,
            },
        })
    }

    async listAll() {
        return await prisma.contact.findMany({
            select: {
                id: true,
                email: true,
                identifier: true,
                subscribed: true,
            },
        })
    }

    async delete(contactId: string) {
        await prisma.contact.delete({
            where: {
                id: contactId,
            },
        })
    }
}
