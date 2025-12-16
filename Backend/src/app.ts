// just a placeholder 
import { Hono } from 'hono'

const app = new Hono()

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to CallSense API',
    status: 'running',
    timestamp: new Date().toISOString(),
  })
})

// Example API endpoint
app.get('/api/status', (c) => {
  return c.json({
    service: 'CallSense Backend',
    version: '1.0.0',
    status: 'healthy',
  })
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
