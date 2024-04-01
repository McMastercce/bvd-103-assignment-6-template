import Koa from 'koa'
import cors from '@koa/cors'
import qs from 'koa-qs'
import zodRouter from 'koa-zod-router'
import { setupWarehouseRoutes } from './src/warehouse'
import { setupBookRoutes } from './src/books'
import { RegisterRoutes } from './routes/routes'
import swagger from './routes/swagger.json'
import KoaRouter from '@koa/router'
import { koaSwagger } from 'koa2-swagger-ui'

const app = new Koa()

// We use koa-qs to enable parsing complex query strings, like our filters.
qs(app)

// And we add cors to ensure we can access our API from the mcmasterful-books website
app.use(cors())

const router = zodRouter({ zodRouter: { exposeRequestErrors: true } })

setupWarehouseRoutes(router)
setupBookRoutes(router)

app.use(router.routes())

const koaRouter = new KoaRouter()

RegisterRoutes(koaRouter)

app.use(koaRouter.routes())
app.use(koaSwagger({
  routePrefix: '/docs',
  specPrefix: '/docs/spec',
  exposeSpec: true,
  swaggerOptions: {
    spec: swagger
  }

}))

app.listen(3000, () => {
  console.log('listening!')
})
