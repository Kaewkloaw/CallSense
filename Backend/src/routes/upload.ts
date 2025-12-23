import { Hono } from 'hono'
import { predictHandler } from '../controllers/uploadController'
import { SpeechClassifier } from '../services/modelService'
import { getAllPredictions, updateActualLabel } from '../services/recordService'

export function createUploadRoutes(classifier: SpeechClassifier): Hono {
  const router = new Hono()

  router.post('/predict', async (c) => {
    return predictHandler(c, classifier)
  })

  /**
    * GET /records
    * Retrieve all prediction records from CSV file
   */
  router.get('/records', async (c) => {
    const records = await getAllPredictions()
    return c.json({
      total: records.length,
      records: records,
    })
  })
  return router
}
