import { prisma } from 'database/prisma-client'

export class ContactRepository implements IContactRepository {
  async createMany(contacts: Omit<Contact, 'id'>[]) {
    await prisma.contact.createMany({
      data: contacts.map(contact => ({
        identifier: contact.identifier,
        email: contact.email,
        subscribed: contact.subscribed,
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

  async delete(contactId: string) {
    await prisma.contact.delete({
      where: {
        id: contactId,
      },
    })
  }
}
