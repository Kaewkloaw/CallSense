import { useState, useRef } from "react";
import { Play, Upload, AlertTriangle, CheckCircle, Mic, FileAudio, Circle } from "lucide-react";
import { Button } from "./ui/button";
const scenarios = [{
  id: "bank",
  title: "Bank Scam",
  description: "Caller pretending to be from your bank",
  result: "scam",
  analysis: "AI Voice detected. Pattern matches financial scam attempts."
}, {
  id: "delivery",
  title: "Delivery Notice",
  description: "Fake delivery notification",
  result: "scam",
  analysis: "Suspicious urgency patterns. Requesting personal information."
}, {
  id: "real",
  title: "Real Company",
  description: "Verified business call",
  result: "safe",
  analysis: "Caller verified. KBTG official customer service line."
}, {
  id: "government",
  title: "Government Scam",
  description: "Fake official threatening arrest",
  result: "scam",
  analysis: "High emotional manipulation score. Known scam pattern detected."
}];
export function DemoSection() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzingUpload, setIsAnalyzingUpload] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    result: "scam" | "safe";
    analysis: string;
  } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePlayScenario = (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    setUploadedFile(null);
    setUploadResult(null);
    setIsPlaying(true);
    setShowResult(false);
    setTimeout(() => {
      setIsPlaying(false);
      setShowResult(true);
    }, 2000);
  };
  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsAnalyzingUpload(true);
      setUploadedFile(null);
      setShowResult(false);
      setUploadResult(null);

      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzingUpload(false);
        const isScam = Math.random() > 0.5;
        setUploadResult({
          result: isScam ? "scam" : "safe",
          analysis: isScam ? "AI Voice patterns detected. Suspicious emotional manipulation and urgency keywords found." : "No suspicious patterns detected. Voice appears authentic."
        });
      }, 3000);
    } else {
      // Start recording
      setIsRecording(true);
      setShowResult(false);
      setUploadResult(null);
      setUploadedFile(null);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowResult(false);
      setUploadResult(null);
      setIsAnalyzingUpload(true);
      setTimeout(() => {
        setIsAnalyzingUpload(false);
        const isScam = Math.random() > 0.5;
        setUploadResult({
          result: isScam ? "scam" : "safe",
          analysis: isScam ? "AI Voice patterns detected. Suspicious emotional manipulation and urgency keywords found." : "No suspicious patterns detected. Voice appears authentic."
        });
      }, 3000);
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const displayResult = uploadResult || (showResult ? {
    result: selectedScenario.result as "scam" | "safe",
    analysis: selectedScenario.analysis
  } : null);
  const isAnalyzing = isPlaying || isAnalyzingUpload;
  return <section id="demo" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{
        background: 'var(--gradient-card)'
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Interactive Demo</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Try our demo to see how Callsense protects you from different scam scenarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Scenario selector */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Select a Scenario</h3>
            
            <div className="grid gap-3">
              {scenarios.map(scenario => <div key={scenario.id} className={`w-full p-4 rounded-xl transition-all duration-300 ${selectedScenario.id === scenario.id && !uploadedFile && !isRecording ? "glass-card shadow-lg border-primary/50" : "bg-muted/50 hover:bg-muted"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{scenario.title}</p>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      
                      <button onClick={() => handlePlayScenario(scenario)} disabled={isAnalyzing || isRecording} className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100">
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* Uploaded file display */}
            {uploadedFile && <div className="p-4 rounded-xl glass-card border-primary/50 space-y-2">
                <div className="flex items-center gap-3">
                  <FileAudio className="w-5 h-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>}

            <div className="flex gap-4">
              <Button variant="hero" size="lg" onClick={handleRecord} disabled={isAnalyzing} className={isRecording ? "animate-pulse bg-destructive hover:bg-destructive/90" : ""}>
                {isRecording ? <>
                    <Circle className="w-5 h-5 fill-current" />
                    Stop Recording
                  </> : <>
                    <Mic className="w-5 h-5" />
                    Record
                  </>}
              </Button>
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              <Button variant="glass" size="lg" onClick={handleUploadClick} disabled={isAnalyzing || isRecording}>
                <Upload className="w-5 h-5" />
                Upload Audio
              </Button>
            </div>
          </div>

          {/* Phone mockup with result */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30" style={{
              background: 'var(--gradient-hero)'
            }} />
              
              <div className="relative phone-mockup w-72 md:w-80">
                <div className="phone-screen aspect-[9/19] flex flex-col">
                  {/* Status bar */}
                  <div className="h-12 px-6 flex items-center justify-between bg-card">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="w-20 h-6 rounded-full bg-foreground/10" />
                    <div className="flex gap-1">
                      <div className="w-4 h-3 rounded-sm bg-foreground/30" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 space-y-6">
                    {/* Call info */}
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {isRecording ? "Recording..." : uploadedFile ? "Uploaded Audio" : "Incoming Call"}
                      </p>
                      <p className="font-display text-xl font-semibold">
                        {isRecording ? "Live Recording" : uploadedFile ? uploadedFile.name.split('.')[0] : selectedScenario.title}
                      </p>
                    </div>

                    {/* Waveform animation */}
                    <div className="h-24 flex items-center justify-center gap-1">
                      {[...Array(20)].map((_, i) => <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isAnalyzing || isRecording ? "bg-primary animate-pulse" : "bg-muted"}`} style={{
                      height: isAnalyzing || isRecording ? `${Math.random() * 60 + 20}%` : "20%",
                      animationDelay: `${i * 0.05}s`
                    }} />)}
                    </div>

                    {/* Analysis indicator */}
                    {isAnalyzing && <div className="flex items-center justify-center gap-2 text-primary">
                        <Mic className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-medium">Analyzing voice...</span>
                      </div>}

                    {/* Recording indicator */}
                    {isRecording && !isAnalyzing && <div className="flex items-center justify-center gap-2 text-destructive">
                        <Circle className="w-4 h-4 fill-current animate-pulse" />
                        <span className="text-sm font-medium">Recording audio...</span>
                      </div>}

                    {/* Result */}
                    {displayResult && !isAnalyzing && !isRecording && <div className={`p-4 rounded-2xl space-y-3 animate-scale-in ${displayResult.result === "scam" ? "bg-destructive/10 border border-destructive/20" : "bg-green-500/10 border border-green-500/20"}`}>
                        <div className="flex items-center gap-2">
                          {displayResult.result === "scam" ? <>
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                              <span className="font-semibold text-destructive">Scam Detected</span>
                            </> : <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-semibold text-green-500">Verified Safe</span>
                            </>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {displayResult.analysis}
                        </p>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}