type Contact = {
  id: string
  identifier: string
  email: string
  subscribed: boolean
}

interface IContactRepository {
  createMany: (contacts: Omit<Contact, 'id'>[]) => Promise<void>
  changeSubscription: (contactId: string, subscribed: boolean) => Promise<void>
  delete: (contactId: string) => Promise<void>
}
