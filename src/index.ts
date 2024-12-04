import multipart from '@fastify/multipart'
import { fastify } from 'fastify'
import { appRoutes } from 'routes'
import { env } from './env'

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
