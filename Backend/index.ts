import { serve } from 'bun'
import app from './src/app'

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('🚀 Backend running on http://localhost:3000')