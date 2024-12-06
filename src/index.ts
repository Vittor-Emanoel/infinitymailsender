import multipart from '@fastify/multipart'
import { fastify } from 'fastify'

import { env } from '@/config/env'
import { appRoutes } from '@/http/routes'

const app = fastify()
app.register(multipart)
app.register(appRoutes)

app.listen(
    {
        port: env.PORT,
    },
    () => {
        console.log('Server is running http://localhost:3333')
    },
)
