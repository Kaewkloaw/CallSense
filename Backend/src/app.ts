import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUploadRoutes } from './routes/upload'
import { createClassifier } from './services/modelService'

const app = new Hono()

// Initialize the ML model classifier
// Points to the FastAPI model server running on port 8000
const classifier = createClassifier(
  'model/yolo11n-best.pt',
  process.env.MODEL_API_URL || 'http://localhost:8000'
)

// CORS middleware
app.use('*', cors({
  origin: '*', // tighten in production
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Accept'],
}))

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

// Mount upload routes
const uploadRoutes = createUploadRoutes(classifier)
app.route('/api', uploadRoutes)

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
