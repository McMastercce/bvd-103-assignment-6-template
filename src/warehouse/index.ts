import { type ZodRouter } from 'koa-zod-router'
import { placeOrderRouter } from './place_order'
import { listOrdersRouter } from './list_orders'
import { fulfilOrderRouter } from './fulfil_order'

export function setupWarehouseRoutes (router: ZodRouter): void {
  placeOrderRouter(router)

  listOrdersRouter(router)

  fulfilOrderRouter(router)
}
