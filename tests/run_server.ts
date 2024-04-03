import { afterEach, beforeEach } from 'vitest'
import server from '../server'

export interface ServerTestContext {
  address: string
  closeServer: () => void
}

export default function (): void {
  beforeEach<ServerTestContext>(async (context) => {
    const instance = server()
    const address = instance.address()
    if (typeof address === 'string') {
      context.address = `http://${address}`
    } else if (address !== null) {
      context.address = `http://localhost:${address.port}`
    } else {
      throw new Error('couldnt set up server')
    }
    context.closeServer = () => {
      instance.close()
    }
  })

  afterEach<ServerTestContext>(async (context) => {
    context.closeServer()
  })
}
