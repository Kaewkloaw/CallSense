# CallSense Frontend

Modern React web application for audio file upload and AI voice detection analysis. Provides an intuitive interface for uploading audio files and viewing classification results.

## Quick Setup

### 1. Install dependencies
```bash
bun install
```

### 2. Run development server
```bash
bun run dev
```

Application will be available at `http://localhost:5173`

### 3. Build for production
```bash
bun run build
```

Optimized build output in `dist/` directory

## Features

- 📤 **Audio Upload** - Drag-and-drop or click to upload MP3/WAV files
- 🎙️ **Voice Detection** - Real-time classification of human vs AI voices
- 📊 **Risk Assessment** - Visual risk level indicators
- 📝 **Prediction History** - View past classifications
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn-ui** - Component library
- **Axios** - HTTP requests

## Project Structure

```
src/
├── components/
│   ├── DemoSection.tsx        # Main demo interface
│   ├── HeroSection.tsx        # Landing section
│   ├── FeaturesSection.tsx    # Features showcase
│   ├── HowItWorksSection.tsx  # Tutorial section
│   ├── Navbar.tsx             # Navigation bar
│   ├── Footer.tsx             # Footer
│   ├── ThemeToggle.tsx        # Dark mode toggle
│   └── ui/                    # shadcn-ui components
├── pages/
│   ├── Index.tsx              # Home page
│   └── NotFound.tsx           # 404 page
├── hooks/
│   ├── useTheme.tsx           # Theme management
│   └── use-toast.ts           # Toast notifications
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api/`

**Main Endpoints Used**:
- `POST /api/upload` - Upload and classify audio
- `GET /api/records` - Fetch prediction history

## Environment Configuration

The backend URL is configured in components that make API calls. Update accordingly if running on a different server.

## Requirements

- **Backend** running on `http://localhost:3000`
- **Node.js/Bun** for development

## Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build locally
bun run lint     # Run ESLint
```

## Component Overview

- **DemoSection** - Main upload and results interface
- **HeroSection** - Welcome/intro section
- **FeaturesSection** - Feature highlights
- **HowItWorksSection** - How the system works
- **Navbar** - Navigation and branding
- **ThemeToggle** - Light/dark mode switch

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
