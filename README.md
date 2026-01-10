<div align="center">
  <h1>🛡️CALLSENSE</h1>
  <h3>AI-POWERED VOICE FRAUD DETECTION SYSTEM</h3>
  
  <img src="https://readme-typing-svg.herokuapp.com/?lines=SYSTEM+STATUS:+ACTIVE;DETECTING+SYNTHETIC+VOICE+PATTERNS...;JUST-IN-TIME+FRAUD+PREVENTION;ZERO-TRUST+VOICE+SECURITY&font=Fira+Code&center=true&width=600&height=50&color=39FF14&background=000000&vCenter=true">
  
  <p>
    <b>Secure your communications against Deepfakes and AI Impersonation.</b><br>
    <i>On-device processing. Just-in-time Analysis. Maximum Privacy.</i>
  </p>
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  <br>
  ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
  ![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>


<div align="center">
  <video src="https://github.com/user-attachments/assets/0310bc9a-b754-427f-8b31-f53e5d6a8787" controls loop autoplay muted width="100%" style="border-radius: 10px;">
  </video>

  <p><i>โปรดเปิดเพื่อเปิดเสียงเพื่อรับชมการสาธิตระบบ CallSense</i></p>
</div>


**CallSense** is an advanced cybersecurity utility designed to mitigate the risks of Social Engineering and Voice Phishing (Vishing). By leveraging deep learning algorithms, CallSense analyzes audio frequencies in just-in-time to distinguish between organic human speech and synthetic AI-generated artifacts.
<br>
This system operates on a **Zero-Trust** model regarding audio data, providing immediate forensic analysis to prevent fraud before it occurs.

<details>
<summary>🛡️ Core Capabilities (MVP) (JSON Output)</summary>
  
* **Synthetic Voice Detection:** Algorithmic identification of deepfake patterns and vocoder artifacts.
* **Just-in-Time Threat Assessment:** Dynamic classification of calls into risk tiers (High/Medium/Low).
* **Scam Prevention Protocols:** Proactive alerting system for impersonation attacks.
* **Privacy-First Architecture:** All telemetry and analysis are processed locally; no raw audio data leaves the secure environment.
</details>

<details>
  <summary>📊 Threat Intelligence & Risk Levels)</summary>
  
The system utilizes a confidence-based scoring engine to determine the probability of AI manipulation.

| Threat Score (AI Confidence) | Risk Classification | System Status           | Protocol / Action                         |
| :--------------------------- | :------------------ | :---------------------- | :---------------------------------------- |
| **≥ 0.80**                   | 🔴 **CRITICAL**     | **AI / SCAM CONFIRMED** | **TERMINATE CONNECTION IMMEDIATELY**      |
| **0.40 – 0.79**              | 🟡 **WARNING**      | **SUSPICIOUS ACTIVITY** | **VERIFY IDENTITY via SECONDARY CHANNEL** |
| **< 0.40**                   | 🟢 **SAFE**         | **HUMAN VOICE**         | **PROCEED WITH CAUTION**                  |

</details>

<details>
  <summary>⚙️ Detection Methodology</summary>
  
The Machine Learning kernel analyzes specific bio-acoustic markers:
1.  **Pitch Consistency:** Detecting unnatural "perfect" pitch maintenance common in TTS engines.
2.  **Rhythm & Timing:** Analyzing millisecond-level speech cadences.
3.  **Frequency Spectrum:** Identifying high-frequency artifacts left by neural vocoders.
4.  **Natural Artifacts:** Verifying the presence of organic breath and micro-pauses.

**Output:** A confidence float between `0.0` (Organic) and `1.0` (Synthetic).

</details>

<details>
  <summary>💻 Tech Stack & Architecture</summary>

| Component         | Technology               | Description                   |
| :---------------- | :----------------------- | :---------------------------- |
| **Analysis Core** | Python, FastAPI          | ML Model & Inference Engine   |
| **Backend API**   | Bun, Hono, TypeScript    | High-performance API Gateway  |
| **Interface**     | React 18, Vite, Tailwind | Responsive Forensic Dashboard |
| **Documentation** | Swagger UI               | OpenAPI Specification         |

</details>
<details>
  <summary>🚀 Getting Started</summary>
  
### 🐳 Option 1: Docker (Recommended)
Best for users who want to see the system in action without configuring local environments.<br>
**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
```powershell
   git clone https://github.com/Kaewkloaw/callsense.git
   cd callsense
   docker-compose up --build
```
> **Status:** Dashboard accessible at `http://localhost:8080`
### 💻 Option 2: Local Development (Manual Setup)
Best for developers who want to modify the code and see changes in Just-in-time.<br>
**Prerequisites:** Python 3.10+, Bun Runtime, and Node.js.

### Step 1: Clone the repository

```powershell
git clone https://github.com/Kaewkloaw/callsense.git
```

### Step 2: Initialize ML Kernel [terminal 1]

_Execute the following in PowerShell from the project root to provision the virtual environment and launch the inference server._

##### _optional for Clean existing environments_

```powershell
Remove-Item -Recurse -Force venv
```

#### Create VENV

```powershell
python -m venv venv
```

```powershell
.\venv\Scripts\Activate.ps1
```

##### _optional for Force pip upgrad_

```powershell
python -m ensurepip --upgrade
python -m pip install --upgrade pip
```

#### Install Core Libraries

```powershell
pip install uv
uv pip install "llvmlite>=0.43.0" "numba>=0.59.0"
uv pip install -r .\Backend\requirements.txt
```

#### Start Inference Engine on Port 8000

```powershell
cd Backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

> **Status:** ML Model listening at `http://localhost:8000`

### Step 3: Initialize Backend Gateway [terminal 2]

_Open a new terminal instance._

```bash
cd Backend
bun install
cp .env.example .env
bun run dev
```

> **Status:** API Gateway active at `http://localhost:3000` | Docs: `/api-docs`

### Step 4: Initialize Frontend Interface [terminal 3]

_Open a new terminal instance._

```bash
cd Frontend
bun install
cp .env.example .env
bun run dev
```

> **Status:** Dashboard accessible at `http://localhost:8080`

</details>

<details>
  <summary>🔌 API Specification</summary>

### POST `/api/predict`

Submit audio payload for forensic analysis.

**Headers:** `Content-Type: multipart/form-data`

**Response Payload:**

```json
{
  "filename": "evidence_audio.mp3",
  "y_prob": {
    "human": 0.1564,
    "nonhuman": 0.8435
  },
  "risk": {
    "level": "High Risk (AI voice)",
    "trustability": 15.65,
    "riskType": "scam"
  }
}
```

</details>

<details>
  <summary>🔧 Environment Configuration</summary>

**Backend (`.env`)**

```ini
MODEL_API_URL=http://localhost:8000  # Target ML Endpoint
PORT=3000                            # Gateway Port
```

**Frontend (`.env`)**

```ini
VITE_API_URL=http://localhost:3000   # Gateway Target
```

</details>

<details>
  <summary>🕵️ Demo Scenarios</summary>

The dashboard includes pre-loaded forensic samples for system validation:

- **⚠️ Bank Scam:** Simulation of AI-generated financial fraud.
- **⚠️ Government Scam:** Simulation of authority impersonation.
- **📞 Delivery IVR:** Control sample of legacy automated systems.
- **✅ Real Company:** Control sample of organic human business communication.
</details>

<details>
  <summary>🛠️ Troubleshooting</summary>

| Error Code / Issue               | Diagnostic Step                                              |
| :------------------------------- | :----------------------------------------------------------- |
| **Connection Refused (Backend)** | Verify Port 3000 availability: `lsof -ti:3000`               |
| **Gateway Timeout (Frontend)**   | Ensure `VITE_API_URL` matches the running Backend instance.  |
| **Inference Error (ML)**         | Confirm Python Uvicorn is active on `http://localhost:8000`. |
| **Upload Failure**               | Validate file integrity (MP3/WAV) and check server logs.     |

</details>

<details>
  <summary>🔒 Data Privacy & Compliance</summary>

- **Ephemeral Storage:** Audio payloads are processed in volatile memory and discarded post-analysis.
- **Local Processing:** No data transmission to third-party clouds.
- **Audit Logging:** Metadata (Risk Score, Timestamp) is logged to CSV for administrative review only.
</details>

<div align="center">
  <hr>
  <p><b>CallSense Security Systems &copy; 2024</b><br>
  <i>Detect. Verify. Protect.</i></p>
</div>
