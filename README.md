
# CallSense

**AI Voice Detection System for Call Fraud Prevention**

Advanced AI-powered call protection that detects fraud in real-time. On-device processing for maximum privacy and speed.

## CallSense MVP Feature - AI Voice Detection
Advanced AI detects synthetic voices and deepfakes in real-time during calls.

CallSense uses advanced machine learning to:
- **Detect AI voices** - Identifies synthesized/AI-generated voice patterns
- **Assess fraud risk** - Classifies calls as High Risk, Medium Risk, or Safe
- **Prevent scams** - Helps users identify phone scams and impersonation attacks

## Risk Assessment Levels

CallSense analyzes audio and returns a confidence score for AI detection:

| AI Confidence | Risk Level | Status | Recommendation |
|---|---|---|---|
| **≥ 0.80** | 🔴 High Risk | AI / Scam Detected | **Hang up immediately** |
| **0.40 – 0.79** | 🟡 Medium Risk | Suspicious | **Verify caller identity** |
| **< 0.40** | 🟢 Low Risk | Human Voice | **Appears legitimate** |

### How It Works

1. User uploads an audio file (MP3/WAV)
2. Backend sends audio to ML model for analysis
3. Model returns AI confidence score
4. System classifies risk level
5. Results displayed to user with recommendation

## Quick Start

### Prerequisites
- **Bun** - Download from [bun.sh](https://bun.sh)
- **Node.js** - For development tools
- **FastAPI ML Model** - Running on `http://localhost:8000`

### Backend Setup
```bash
cd Backend
bun install
cp .env.example .env
bun run dev
```
- Runs on: `http://localhost:3000`
- API Docs: `http://localhost:3000/api-docs` (Swagger UI)

### Frontend Setup
```bash
cd Frontend
bun install
cp .env.example .env
bun run dev
```
- Runs on: `http://localhost:8080`

## API Endpoints

### Upload & Analyze
```bash
POST /api/predict
Content-Type: multipart/form-data
```
Analyze an audio file for AI voice detection.

**Response**:
```json
{
  "filename": "audio.mp3",
  "y_prob": {
    "human": 0.1564779281616211,
    "nonhuman": 0.8435221314430237
  },
  "risk": {
    "level": "High Risk (AI voice)",
    "trustability": 15.65,
    "riskType": "scam"
  }
}
```

### Health Check
```bash
GET /api/status
```
Verify backend is running.

### Get Records
```bash
GET /api/records
```
Retrieve history of analyzed calls.

## Environment Variables

### Backend (.env)
```
MODEL_API_URL=http://localhost:8000  # ML model endpoint
PORT=3000                             # Server port
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000   # Backend API endpoint
```

## Features

### Backend
- ✅ Audio file upload (MP3/WAV support)
- ✅ AI voice detection & classification
- ✅ Risk assessment engine
- ✅ Prediction CSV logging
- ✅ CORS support for frontend
- ✅ TypeScript type safety
- ✅ Swagger API documentation
- ✅ Health check endpoints

### Frontend
- ✅ Intuitive audio upload interface
- ✅ Real-time analysis results
- ✅ Visual risk indicators
- ✅ Call prediction history
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Demo scenarios with sample audio

## Tech Stack

### Backend
- **Bun** - Fast JavaScript runtime
- **Hono** - Lightweight web framework
- **TypeScript** - Type-safe development
- **@hono/swagger-ui** - API documentation
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn-ui** - Component library
- **React Router** - Navigation
- **Lucide React** - Icons

## Running the Full Application

**Terminal 1 - Backend**:
```bash
cd Backend
bun install
cp .env.example .env
bun run dev
```

**Terminal 2 - Frontend**:
```bash
cd Frontend
bun install
cp .env.example .env
bun run dev
```

**Terminal 3 - ML Model**:
```bash
python -m uvicorn app:app --port 8000
```

Then visit `http://localhost:8080`

## Troubleshooting

| Issue | Solution |
|---|---|
| Backend won't start | Check if port 3000 is available: `lsof -ti:3000` |
| Frontend won't connect | Verify `VITE_API_URL` in `.env` matches backend URL |
| ML model errors | Ensure FastAPI server runs on `http://localhost:8000` |
| Audio upload fails | Check file format (MP3/WAV) and backend logs |

## Demo Scenarios

The frontend includes demo scenarios with sample audio:
- **Bank Scam** - AI-generated bank impersonation call
- **Delivery IVR** - Human voice automated system
- **Real Company** - Legitimate business call
- **Government Scam** - Fake official threat call

Click "Analyze Demo" to test the system without uploading your own audio.

## How AI Detection Works

The ML model analyzes voice characteristics including:
- Pitch consistency and variation
- Speech rhythm and timing patterns
- Frequency spectrum analysis
- Voice quality metrics
- Natural speech artifacts

Returns a confidence score: **0.0 (Human) to 1.0 (AI)**

## Data Privacy

- Uploaded audio files are stored temporarily
- Analysis results are logged in CSV format
- No personal data is retained beyond analysis
- All processing happens locally
