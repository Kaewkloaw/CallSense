import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { swaggerUI } from '@hono/swagger-ui'
import { createUploadRoutes } from './routes/upload'
import { createClassifier } from './services/modelService'
import { swaggerSpec } from './swagger'

const app = new Hono()

// Initialize the ML model classifier
const classifier = createClassifier(
  'model/yolo11n-best.pt',
  process.env.MODEL_API_URL || 'http://localhost:8000'
)

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Accept', 'Authorization'],
}))

// Swagger UI
app.get('/api-docs', swaggerUI({ url: '/swagger.json' }))
app.get('/swagger.json', (c) => c.json(swaggerSpec))

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to CallSense API',
    status: 'running',
    timestamp: new Date().toISOString(),
  })
})

// Status endpoint
app.get('/api/status', (c) => {
  return c.json({
    service: 'CallSense Backend',
    version: '1.0.0',
    status: 'healthy',
  })
})

const uploadRoutes = createUploadRoutes(classifier)
app.route('/api', uploadRoutes)

app.notFound((c) => c.json({ error: 'Endpoint not found' }, 404))

app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app