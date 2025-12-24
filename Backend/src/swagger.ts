export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'CallSense Backend API',
    version: '1.0.0',
    description: 'Audio file prediction with AI voice detection and risk classification',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local development' },
    { url: process.env.API_URL || 'http://localhost:3000', description: 'Current environment' },
  ],
  paths: {
    '/': {
      get: {
        summary: 'Welcome endpoint',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'Service info',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    status: { type: 'string' },
                    timestamp: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/status': {
      get: {
        summary: 'Get API status',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'API health status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    service: { type: 'string' },
                    version: { type: 'string' },
                    status: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/predict': {
      post: {
        summary: 'Predict audio file for AI voice detection',
        tags: ['Predictions'],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: { type: 'string', format: 'binary', description: 'Audio file (MP3, WAV, M4A)' },
                },
                required: ['file'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Prediction result with risk assessment',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    filename: { type: 'string' },
                    y_prob: {
                      type: 'object',
                      properties: {
                        human: { type: 'number' },
                        nonhuman: { type: 'number' },
                      },
                    },
                    risk: {
                      type: 'object',
                      properties: {
                        level: { type: 'string' },
                        trustability: { type: 'number' },
                        riskType: { type: 'string', enum: ['scam', 'suspicious', 'safe'] },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - missing or invalid file',
          },
        },
      },
    },
    '/api/records': {
      get: {
        summary: 'Get all prediction records',
        tags: ['Records'],
        responses: {
          '200': {
            description: 'List of all prediction records',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total: { type: 'number' },
                    records: {
                      type: 'array',
                      items: {
                        type: 'object',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
