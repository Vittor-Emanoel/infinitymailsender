import { importContacts } from '@/http/controllers/import-contacts'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
    app.post('/import-contacts', importContacts)
}
