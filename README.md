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
  <video src="https://github.com/user-attachments/assets/0310bc9a-b754-427f-8b31-f53e5d6a8787"></video>
  <i>🔊 <b>Note:</b> Please click the volume icon to enable audio for the CallSense system demonstration.</i>
</div>
<br>

**CallSense** is an advanced on-device AI guardian embedded in the OS to neutralize voice fraud and deepfakes. Unlike static blacklists, it utilizes dynamic bio-acoustic fingerprinting for real-time threat detection. We deliver proactive, privacy-preserving security that is seamless and built-in from the moment the device is unboxed.

### 🛡️ Core Capabilities (MVP)
<details>
  <summary><b>📲 Seamless Native Integration (Zero-Friction Adoption)</b></summary>
  
  <i>CallSense removes the barrier to entry for security. It is not an app that users need to download, configure, or update manually.</i>
  * **Out-of-the-Box Protection** integrated directly into the Samsung One UI Dialer, providing instant protection for every user, regardless of their technical literacy.
  * **On-Device Processing** powered by the device's NPU, ensuring zero latency and preserving battery life.
  * **Privacy-First Architecture** adopts a "Privacy by Design" approach. All audio analysis is performed locally; raw voice data never leaves the user's device.
</details>

<details>
  <summary><b>🧠 Hybrid Threat Detection Engine</b></summary>
  
  <i>Our proprietary AI engine analyzes calls in two simultaneous dimensions to ensure maximum accuracy</i>
  * **Deepfake Detection** detects minute artifacts, unnatural pitch consistencies, and high-frequency signatures typical of Neural Voice Synthesis (AI Voice Cloning).
  * **Semantic & Behavioral Analysis:** listens for "Social Engineering" patterns in real-time, identifying:
      * High-Risk Keywords e.g. transfer money, police investigation, bank account suspended.
      * Emotional Coercion detects artificially induced urgency, aggression, or threatening tones used by scammers.
</details>

<details>
  <summary><b>✅ Verified Trust Ecosystem (Smart Caller ID)</b></summary>
  
  <i>CallSense restores faith in legitimate business communications by verifying the source of the call.</i>
  * **Business Verification Protocol** utilizes cryptographically signed headers to verify calls from partner banks and organizations, effectively neutralizing Caller ID Spoofing.
  * **The "Green Badge" Assurance** displays a prominent **Verified Badge** on the incoming call screen, allowing users to answer important calls from financial institutions with confidence.
</details>
    
<details>
  <summary><b>🎨 Ambient Alert System (Non-Intrusive UX)</b></summary>
  
  <i>Security warnings shouldn't be annoying. CallSense replaces disruptive pop-ups with intuitive, peripheral cues.</i>
  * **Edge Lighting Integration** utilizes the physical edge of the Samsung display to signal risk levels globally without blocking the screen content.
  * **Global Status Indicators**
      * 🟢 Verified Business / Safe Caller.
      * 🟡 Suspicious activity or unknown pattern detected.
      * 🔴 Confirmed Fraud / Deepfake signature detected.
</details>

<details>
  <summary><b>🛡️ Active Defense & Rapid Response</b></summary>
  
  <i>We provide users with tools to fight back and protect their digital identity.</i>
  * **Anti-Voice Cloning Shield** automatically introduces subtle noise or disrupts the outgoing audio stream when a threat is detected, preventing scammers from harvesting the user's voice for future AI cloning.
  * **One-Click Incident Reporting** streamlines the complex process of filing a complaint. With a single tap, users can generate a standardized fraud report (containing timestamps, risk scores, and attacker metadata) and securely transmit it to relevant authorities or banks instantly.
</details>

### 🚀 Getting Started
<details>
  <summary><b>🐳 Option 1: Docker (Recommended)</b></summary>
  
Best for users who want to see the system in action without configuring local environments.<br>
**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
```powershell
   git clone https://github.com/Kaewkloaw/CallSense.git
   cd callsense
   docker-compose up --build
```
> **Status:** Dashboard accessible at `http://localhost:8080`
</details>
<details>
  <summary><b>💻 Option 2: Local Development (Manual Setup)</b></summary>
  
Best for developers who want to modify the code and see changes in Just-in-time.<br>
**Prerequisites:** Python 3.10+, Bun Runtime, and Node.js.

### Step 1: Clone the repository

```powershell
git clone https://github.com/Kaewkloaw/CallSense.git
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

##### _optional for Force pip upgrade_

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

</details>

### 🛣️ Roadmap
<details>
  <summary><b>Phase 1 Prototype & Core Technology Development (Current)</b></summary>
  
*Goal: Validate technical feasibility (Proof of Concept) for the Hackathon.*
- [x] **User Research & Validation** conducted user surveys and market analysis to validate the problem statement.
- [x] **AI Core Development** develop Real-time Deepfake & Synthetic Voice Detection Model.
- [x] **Dashboard UI** create Risk Analysis Interface (Forensic Dashboard).
- [x] **Infrastructure** enable Docker support for streamlined deployment.
- [x] **Simulation Mode** develop Call Simulation Mode for demonstration purposes.
- [ ] **Fraud Pattern Engine** implement Keyword and Emotional Urgency Detection System.
- [ ] **Model Validation** benchmark model accuracy and latency to ensure real-time performance.
</details>

<details>
  <summary><b>Phase 2: System Integration & Pilot Testing (Q2 2026)</b></summary>
  
*Goal: Embed system into Samsung Ecosystem and pilot with KBTG.*
- [ ] **Samsung One UI Integration** embed detection engine directly into the Samsung Native Dialer.
- [ ] **Ambient Alert System** integrate Edge Lighting API to visualize security status alerts.
- [ ] **Verified Business Pilot** connect with KBTG database to test the "Verified Business" (Green Badge) system.
- [ ] **Optimization** optimize NPU processing to achieve zero-latency performance.
</details>

<details>
  <summary><b>Phase 3: Public Launch & Security Network Expansion (Q3 2026)</b></summary>

*Goal: Mass user adoption and full banking integration.*
- [ ] **Active Defense Module** activate the "Anti-Voice Cloning" defense mechanism.
- [ ] **One-Click Reporting** implement automated One-Click Reporting to transmit evidence to banking fraud centers.
- [ ] **Threat Intelligence Network** establish a decentralized, privacy-preserving network for sharing new scam patterns across devices.
- [ ] **Official Release** official OTA rollout to Samsung Galaxy devices.
</details>

<details>
  <summary><b>Phase 4: Future Expansion (Q4 2026)</b></summary>
  
*Goal: Enterprise-level protection and cross-platform expansion.*
- [ ] **Cross-App Protection** extend protection to VoIP applications (LINE, Messenger, WhatsApp).
- [ ] **Enterprise SDK** release CallSense SDK for third-party developers and other financial institutions.
- [ ] **Next-Gen Context AI** deploy Small On-device LLMs for deeper, more complex conversational context analysis.
</details>

### 📐 Other
<details>
  <summary>📊 Threat Intelligence & Risk Levels</summary>
  
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
  <p><b>CallSense Security Systems &copy; 2025</b><br>
  <i>Detect. Verify. Protect.</i></p>
</div>
