export interface PredictionResponse {
  filename: string
  y_prob: {
    human: number
    nonhuman: number
  }
  risk: {
    level: string
    trustability: number
  }
}

export interface ErrorResponse {
  error: string
  status?: number
}
