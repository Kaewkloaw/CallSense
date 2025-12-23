import type { Context } from 'hono'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { isValidAudioFile } from '../services/audioService'
import { SpeechClassifier } from '../services/modelService'
import type { PredictionResponse, ErrorResponse } from '../types'
import { assessRisk } from '../utils/riskAssessment'
import { logPredictionToCSV } from '../services/recordService'

const UPLOAD_DIR = 'mp3_files'

/**
 * Initialize upload directory
 */
async function ensureUploadDir(): Promise<void> {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    console.error('Failed to create upload directory:', error)
    throw error
  }
}

/**
 * Handle file prediction
 */
export async function predictHandler(
  c: Context,
  classifier: SpeechClassifier
): Promise<Response> {
  try {
    await ensureUploadDir()

    // Get the form data from request
    const formData = await c.req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return c.json(
        { error: 'No file provided' } as ErrorResponse,
        400
      )
    }

    // Validate file extension
    if (!isValidAudioFile(file.name)) {
      return c.json(
        {
          error: 'Only .wav and .mp3 files are supported',
        } as ErrorResponse,
        400
      )
    }

    // Save file to disk
    const filePath = join(UPLOAD_DIR, file.name)
    const buffer = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(buffer))

    console.log(`File saved: ${filePath}`)

    // Get prediction from model (model handles audio processing)
    const prediction = await classifier.predict(filePath)

    // Assess risk based on nonhuman probability and human score
    const riskAssessment = assessRisk(prediction.nonhuman, prediction.human)

    // Log prediction to CSV for record keeping
    await logPredictionToCSV({
      timestamp: new Date().toISOString(),
      filename: file.name,
      human_score: prediction.human,
      nonhuman_score: prediction.nonhuman,
      risk_level: riskAssessment.level,
    })

    // Return prediction result with risk assessment
    const response: PredictionResponse = {
      filename: file.name,
      y_prob: {
        human: prediction.human,
        nonhuman: prediction.nonhuman,
      },
      risk: riskAssessment,
    }

    return c.json(response, 200)
  } catch (error) {
    console.error('Prediction error:', error)
    return c.json(
      {
        error: `Prediction failed: ${error instanceof Error ? error.message : String(error)}`,
      } as ErrorResponse,
      500
    )
  }
}
