# CallSense

AI voice detection system for call fraud prevention. Detects AI-generated voices in audio files and assesses risk levels.

## Project Structure

- **Backend** - Bun + Hono TypeScript server for audio classification
- **Frontend** - React + Vite web application for audio upload and analysis

## Quick Start

### Backend
```bash
cd Backend
bun install

# Create .env file
echo "MODEL_API_URL=http://localhost:8000" > .env
echo "PORT=3000" >> .env

# Run development server
bun run dev
```

**API Documentation**: Available at `http://localhost:3000/api-docs` (Swagger UI)

**Endpoints**:
- `POST /api/upload` - Upload audio file for classification
- `GET /api/status` - Health check endpoint
- `GET /api/records` - Retrieve prediction history

### Frontend
```bash
cd Frontend
bun install
bun run dev
```

**App runs on**: `http://localhost:5173`

## Features

**Backend**:
- Audio file upload (MP3/WAV support)
- Speech classification (Human vs AI voice detection)
- Risk assessment based on confidence thresholds
- CSV record keeping of predictions
- CORS enabled for frontend communication
- TypeScript for type safety
- Swagger API documentation

**Frontend**:
- Audio file upload interface
- Real-time classification results
- Risk assessment visualization
- Prediction history
- Dark mode support

## Requirements

- **Bun runtime** - Download from [bun.sh](https://bun.sh)
- **Node.js** - For frontend build tools
- **FastAPI ML model server** - Running on `http://localhost:8000`

## Environment Variables

Create `.env` in Backend directory:
```
MODEL_API_URL=http://localhost:8000    # ML model API endpoint
PORT=3000                               # Backend server port
```

## Project Structure

```
Backend/
  ├── src/
  │   ├── app.ts              # Main Hono app
  │   ├── swagger.ts          # API documentation
  │   ├── controllers/        # Request handlers
  │   ├── routes/             # API routes
  │   ├── services/           # Business logic
  │   └── utils/              # Utilities
  ├── package.json
  └── tsconfig.json

Frontend/
  ├── src/
  │   ├── components/         # React components
  │   ├── pages/              # Page components
  │   ├── hooks/              # Custom hooks
  │   └── App.tsx             # Main app
  ├── package.json
  └── vite.config.ts
```