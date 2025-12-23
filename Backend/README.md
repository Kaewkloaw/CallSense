# CallSense Backend

A Bun + Hono TypeScript server for speech classification. Accepts audio file uploads, sends them to a FastAPI ML model, classifies risk based on AI voice detection, and maintains CSV records of predictions.

## Features

- ✅ Audio file upload with MP3/WAV support
- ✅ Integration with FastAPI ML model server
- ✅ Speech classification: Human vs AI voice detection
- ✅ Risk assessment based on confidence thresholds
- ✅ Automatic CSV record keeping of predictions
- ✅ File persistence in `mp3_files/` directory
- ✅ CORS enabled for frontend communication
- ✅ TypeScript for type safety
- ✅ Health check endpoints

## Setup

### Install dependencies:

```bash
bun install
```

### Configure environment:

Set the MODEL API endpoint (default: `http://localhost:8000`):

```bash
export MODEL_API_URL=http://localhost:8000
```

Or create a `.env` file:
```
MODEL_API_URL=http://localhost:8000
PORT=3000
```

### Run the server:

```bash
# Development (with hot reload)
bun run dev

# Production
bun run start
```

The server will start on `http://localhost:3000`

### Prerequisites:

- FastAPI model server running on `http://localhost:8000`
  - Endpoint: `POST /predict`
  - Accepts: `multipart/form-data` with `file` field
  - Returns: `{ "y_prob": { "human": number, "nonhuman": number } }`

## API Endpoints

### `GET /` - Welcome
Returns service info and status.

```bash
curl http://localhost:3000
```

**Response:**
```json
{
  "message": "Welcome to CallSense API",
  "status": "running",
  "timestamp": "2025-12-24T10:00:00.000Z"
}
```

### `GET /api/status` - Service Status
Returns backend service status.

```bash
curl http://localhost:3000/api/status
```

**Response:**
```json
{
  "service": "CallSense Backend",
  "version": "1.0.0",
  "status": "healthy"
}
```

### `POST /api/predict` - Predict Audio File
Upload an audio file for speech classification and AI voice detection.

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `file`
- Accepted formats: `.mp3`, `.wav`

**Example (cURL):**

```bash
curl -X POST http://localhost:3000/api/predict \
  -F "file=@audio.mp3"
```

**Example (Frontend - React):**

```typescript
const predictAudio = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://localhost:3000/api/predict', {
    method: 'POST',
    body: formData,
  })

  const result = await response.json()
  return result
}
```

**Response Success (200):**
```json
{
  "filename": "audio.mp3",
  "y_prob": {
    "human": 0.156478,
    "nonhuman": 0.843522
  },
  "risk": {
    "level": "High Risk (AI voice)",
    "trustability": 15.65
  }
}
```

**Risk Levels:**
- `High Risk (AI voice)` - nonhuman score ≥ 0.80 (very likely AI)
- `Medium Risk` - nonhuman score 0.40-0.79 (uncertain)
- `Low Risk (Human voice)` - nonhuman score < 0.40 (likely human)

**Response Errors:**
- `400` - Invalid file format (must be .mp3 or .wav)
- `400` - No file provided
- `500` - Model API error or timeout

### `GET /api/records` - Get All Predictions
Retrieve all prediction records from CSV file.

```bash
curl http://localhost:3000/api/records
```

**Response (200):**
```json
{
  "total": 5,
  "records": [
    {
      "timestamp": "2025-12-24T10:31:20.456Z",
      "filename": "audio.mp3",
      "human_score": 0.156478,
      "nonhuman_score": 0.843522,
      "risk_level": "High Risk (AI voice)",
      "actual_label": "PENDING"
    }
  ]
}
```

**CSV File Location:** `records/predictions.csv`
- Auto-created on first prediction
- Records all predictions with timestamp, scores, risk level, and manual verification label

## Architecture

```
Frontend (React/Vite)
    ↓ (POST multipart/form-data)
Backend (Bun + Hono)
    ├─ Validates file extension
    ├─ Saves to mp3_files/
    ├─ Forwards to Model API
    └─ Assesses risk + logs to CSV
        ↓ (HTTP POST)
Model API (FastAPI on port 8000)
    └─ YOLO11n model
        ↓ (returns y_prob)
Back to Frontend (JSON response)
```

## Directory Structure

```
Backend/
├── src/
│   ├── app.ts                    # Main Hono app
│   ├── index.ts                  # Entry point
│   ├── controllers/
│   │   └── uploadController.ts   # Request handling
│   ├── services/
│   │   ├── modelService.ts       # FastAPI integration
│   │   ├── audioService.ts       # Audio validation
│   │   └── recordService.ts      # CSV management
│   ├── routes/
│   │   └── upload.ts             # API routes
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       └── riskAssessment.ts     # Risk classification
├── mp3_files/                    # Uploaded audio files
├── records/                      # CSV prediction records
└── package.json
```

## Tech Stack

- **Bun** - Fast JavaScript runtime with native file I/O
- **Hono** - Lightweight web framework
- **TypeScript** - Type-safe development
- **FastAPI** - Python ML model server
- **YOLO11n** - Speech classification model

## Testing

### Using cURL:

```bash
# Health check
curl http://localhost:3000/api/status

# Predict audio
curl -X POST http://localhost:3000/api/predict \
  -F "file=@test.mp3"

# Get all records
curl http://localhost:3000/api/records
```

### Using Postman:

Import `callsense-api.postman_collection.json` into Postman and use the predefined requests.

## Notes

- Backend expects FastAPI model server on `http://localhost:8000`
- Uploaded files are saved to `mp3_files/` directory
- All predictions logged to `records/predictions.csv` for verification
- CSV includes manual label field for marking predictions as correct/incorrect
