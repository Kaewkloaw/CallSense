<div align="center">
  <h1>📞CallSense💖 </h1>
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Welcome+to+CallSense!;🌷+AI+Voice+Fraud+Prevention;✨+Detect+Deepfakes+Instantly;💐+Secure+Your+Calls&center=true&width=500&height=45&color=F48FB1">
  <p align="center">🌼 A lovely AI Voice Detection System to simplify your security journey! 💐</p>
   
  ![React](https://img.shields.io/badge/React-F06292?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-F48FB1?style=for-the-badge&logo=typescript&logoColor=white)
  ![Bun](https://img.shields.io/badge/Bun-EC407A?style=for-the-badge&logo=bun&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-E91E63?style=for-the-badge&logo=python&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-F8BBD0?style=for-the-badge&logo=fastapi&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-F6BDC0?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

<div align="center">
  </div>

## 📄 Project Description
<p style="text-align: justify; line-height: 1.6;">
  <strong>CallSense</strong> is a delightful tool designed to help developers and users handle <strong>Call Fraud and AI Deepfakes</strong> with elegance.
  Whether you are protecting personal calls or securing business communications, this system provides a clean and intuitive detection mechanism.
<br>
  CallSense uses advanced machine learning to detect synthetic voices in real-time, assess fraud risk, and prevent impersonation attacks. It classifies calls as High Risk, Medium Risk, or Safe, ensuring you always know who is on the other line.
</p>

## ✨ Key Features
* 🌸 **AI Voice Detection:** Instantly identifies synthesized and AI-generated voice patterns.
* 🌷 **Risk Assessment:** Classifies calls into clear High, Medium, or Low risk categories.
* 🌺 **Privacy First:** On-device processing ensures your data remains secure and private.
* 🌼 **Real-Time Analysis:** Fast processing architecture using Bun and FastAPI.
* 🍃 **Demo Scenarios:** Includes built-in scenarios (Bank Scam, Delivery IVR) for testing.

## 🎄 Prerequisites
* **Node.js & Bun**
* **Python 3.0+**
* **PowerShell** (for Windows Setup)

## 📊 Risk Assessment Levels

CallSense analyzes audio and returns a confidence score:

| AI Confidence | Risk Level | Status | Recommendation |
|---|---|---|---|
| **≥ 0.80** | 🔴 High Risk | AI / Scam Detected | **Hang up immediately** |
| **0.40 – 0.79** | 🟡 Medium Risk | Suspicious | **Verify caller identity** |
| **< 0.40** | 🟢 Low Risk | Human Voice | **Appears legitimate** |

## 🌱 Installation & Setup

We have organized the installation into three lovely parts. Please follow the steps below to get your garden growing! 💐

### Part 1: ML Model (Python/FastAPI)
*Set up the brain of the operation! Run this complete script in PowerShell from the root folder:* 🧠

powershell
#### 1. Clean, Create, and Activate Environment
if (Test-Path venv) { Remove-Item -Recurse -Force venv }
```
python -m venv venv
.\venv\Scripts\Activate.ps1
```

#### 2. Install Dependencies (Fixes pip issues automatically)
```
python -m ensurepip --upgrade
python -m pip install --upgrade pip
python -m pip install fastapi uvicorn python-multipart
```
#### 3. Run the Model
```
cd Backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```
*The ML Model is now blooming at `http://localhost:8000`!* 🌷

### Part 2: Backend API (Bun/Hono)
*Open a new terminal and set up the bridge!* 🌉

```bash
cd Backend
bun install
cp .env.example .env
bun run dev
```
*Runs on: `http://localhost:3000`*

### Part 3: Frontend (React/Vite)
*Open a new terminal and set up the beautiful interface!* 💅

```bash
cd Frontend
bun install
cp .env.example .env
bun run dev
```
*Runs on: `http://localhost:8080`*

## 📡 API Endpoints

### Upload & Analyze
```bash
POST /api/predict
Content-Type: multipart/form-data
```
Analyze an audio file for AI voice detection.

**Response Example:**
```json
{
  "filename": "audio.mp3",
  "y_prob": {
    "human": 0.156,
    "nonhuman": 0.844
  },
  "risk": {
    "level": "High Risk (AI voice)",
    "trustability": 15.65,
    "riskType": "scam"
  }
}
```

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| **Backend won't start** | Check if port 3000 is available: `lsof -ti:3000` |
| **Frontend won't connect** | Verify `VITE_API_URL` in `.env` matches backend URL |
| **ML model errors** | Ensure FastAPI server runs on `http://localhost:8000` |
| **Pip install fails** | Run `python -m ensurepip --upgrade` inside the venv |

<div align="center">
  <br>
  <p>🌷 <i>Created with Love and Code</i> 🌷</p>
</div>
