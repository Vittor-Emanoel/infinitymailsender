import { Contact } from '@/entities/Contact'
import { prisma } from '@/lib/prisma-client'
import { IContactRepository } from '../IContactRepository'

export class ContactRepository implements IContactRepository {
    async createMany(contacts: Omit<Contact, 'id' | 'subscribed'>[]) {
        await prisma.contact.createMany({
            data: contacts.map(contact => ({
                name: contact.name,
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
                name: true,
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
                name: true,
                subscribed: true,
            },
        })
    }

    async listAll() {
        return await prisma.contact.findMany({
            select: {
                id: true,
                email: true,
                name: true,
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
