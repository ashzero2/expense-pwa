import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import transactionRoute from './routes/transaction.js'
import dashboardRoute from './routes/dashboard.js'

const app = new Hono()

app.use('*', cors({
	origin: 'http://localhost:5173',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/transaction', transactionRoute);
app.route('/dashboard', dashboardRoute);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
