/**
 * ML Model Service - Calls FastAPI model service
 * Connects to: http://localhost:8000 (FastAPI model server)
 */

export interface PredictionResult {
  human: number
  nonhuman: number
}

export class SpeechClassifier {
  private modelPath: string
  private modelApiUrl: string

  constructor(modelPath: string, modelApiUrl: string = 'http://localhost:8000') {
    this.modelPath = modelPath
    this.modelApiUrl = modelApiUrl
    console.log(`Initializing SpeechClassifier with model: ${modelPath}`)
    console.log(`Model API URL: ${this.modelApiUrl}`)
  }

  /**
   * Predict speech classification by calling the FastAPI model server
   * @param filePath Path to audio file (MP3 or WAV)
   * @returns Prediction probabilities from the model
   */
  async predict(filePath: string): Promise<PredictionResult> {
    try {
      // Read the file
      const file = Bun.file(filePath)
      const filename = filePath.split('/').pop() || 'audio.mp3'

      console.log(`Calling model API with file: ${filename}`)

      // Create FormData with the file
      const formData = new FormData()
      formData.append('file', file as Blob, filename)

      // Call the FastAPI model server
      console.log(`POST ${this.modelApiUrl}/predict`)
      const response = await fetch(`${this.modelApiUrl}/predict`, {
        method: 'POST',
        body: formData,
      })

      console.log(`Model API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Model API error response: ${errorText}`)
        throw new Error(
          `Model API returned status ${response.status}: ${response.statusText}`
        )
      }

      const result = (await response.json()) as {
        y_prob?: { human: number; nonhuman: number }
      }

      console.log(`Model prediction result:`, result)

      // Extract prediction from model response
      if (result.y_prob) {
        return {
          human: result.y_prob.human,
          nonhuman: result.y_prob.nonhuman,
        }
      }

      throw new Error('Invalid response format from model API')
    } catch (error) {
      console.error('Model prediction error:', error)
      throw new Error(
        `Failed to get prediction from model: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }
}

export const createClassifier = (
  modelPath: string,
  modelApiUrl?: string
): SpeechClassifier => {
  return new SpeechClassifier(modelPath, modelApiUrl)
}
