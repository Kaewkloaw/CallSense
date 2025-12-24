import { useState, useRef } from "react";
import { Play, Upload, AlertTriangle, CheckCircle, Mic, FileAudio, Circle, Square } from "lucide-react";
import { Button } from "./ui/button";

const API_URL = import.meta.env.VITE_API_URL;

const scenarios = [{
  id: "1",
  title: "fake1",
  description: "Caller pretending to be from your bank",
  result: null,
  sampleFile: "/sample-voice/fake_1.mp3"
}, {
  id: "2",
  title: "fake2",
  description: "Human voice - Automated delivery system (IVR)",
  result: null,
  sampleFile: "/sample-voice/fake_2.mp3"
}, {
  id: "3",
  title: "real1",
  description: "Verified business call",
  result: null,
  sampleFile: "/sample-voice/real_1.mp3"
}, {
  id: "4",
  title: "fake3",
  description: "Fake official threatening arrest",
  result:  null,
  sampleFile: "/sample-voice/fake_18.mp3"
}];
export function DemoSection() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(scenarios[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzingUpload, setIsAnalyzingUpload] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    result: "scam" | "suspicious" | "safe";
    analysis: string;
  } | null>(null);
  const [scenarioCurrentTime, setScenarioCurrentTime] = useState(0);
  const [scenarioDuration, setScenarioDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [isPlayingUpload, setIsPlayingUpload] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scenarioAudioRefObj = useRef<HTMLAudioElement>(null);
  
  const handlePlayScenario = (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    // Clear uploaded file and result when playing scenario
    setUploadedFile(null);
    setUploadedAudioUrl(null);
    setUploadResult(null);
    setShowResult(true); // Show result immediately
    setIsPlaying(true);
    setIsAnalyzingUpload(true); // Start analyzing
    
    // Fetch analysis from API using the sample file
    const fetchScenarioAnalysis = async () => {
      try {
        if (scenario.sampleFile) {
          const response = await fetch(scenario.sampleFile);
          const blob = await response.blob();
          // Extract filename from sampleFile path
          const filename = scenario.sampleFile.split('/').pop() || `${scenario.id}.mp3`;
          const file = new File([blob], filename, { type: 'audio/mpeg' });
          
          const formData = new FormData();
          formData.append("file", file);

          const apiResponse = await fetch(`${API_URL}/api/predict`, {
            method: "POST",
            body: formData,
          });

          if (apiResponse.ok) {
            const data = await apiResponse.json();
            const riskType = data.risk.riskType || (data.risk.level.includes("High Risk") ? "scam" : data.risk.level.includes("Medium Risk") ? "suspicious" : "safe");
            const nonhumanPercent = (data.y_prob.nonhuman * 100).toFixed(1);
            const humanPercent = (data.y_prob.human * 100).toFixed(1);
            
            let analysisText = `${data.risk.level}\n`;
            if (riskType === "scam") {
              analysisText += `AI: ${nonhumanPercent}% detected\nBe cautious with this caller`;
            } else if (riskType === "suspicious") {
              analysisText += `AI: ${nonhumanPercent}% detected\nVerify caller identity`;
            } else {
              analysisText += `Human: ${humanPercent}% confirmed\nCaller appears legitimate`;
            }
            
            setUploadResult({
              result: riskType,
              analysis: analysisText,
            });
          }
        }
      } catch (error) {
        console.error("Scenario analysis error:", error);
      } finally {
        setIsAnalyzingUpload(false);
      }
    };
    
    // If scenario has an audio file, play it
    if (scenario.sampleFile && scenarioAudioRefObj.current) {
      // Set the src directly
      scenarioAudioRefObj.current.src = scenario.sampleFile;
      scenarioAudioRefObj.current.currentTime = 0;
      
      // Fetch analysis in parallel
      fetchScenarioAnalysis();
      
      // Use a small delay to ensure src is set before playing
      setTimeout(() => {
        scenarioAudioRefObj.current?.play().catch(err => {
          console.error('Audio play error:', err);
        });
      }, 100);
    } else {
      // No audio file for playback, but fetch analysis
      fetchScenarioAnalysis();
      
      // Stop playing after showing result
      setTimeout(() => {
        setIsPlaying(false);
      }, 500);
    }
  };
  const handleStopScenario = () => {
    if (scenarioAudioRefObj.current) {
      scenarioAudioRefObj.current.pause();
      scenarioAudioRefObj.current.currentTime = 0;
      setIsPlaying(false);
      setScenarioCurrentTime(0);
    }
  };
  const handleScenarioTimeUpdate = () => {
    if (scenarioAudioRefObj.current) {
      setScenarioCurrentTime(scenarioAudioRefObj.current.currentTime);
    }
  };
  const handleScenarioLoadedMetadata = () => {
    if (scenarioAudioRefObj.current) {
      setScenarioDuration(scenarioAudioRefObj.current.duration);
    }
  };
  const handleScenarioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (scenarioAudioRefObj.current) {
      scenarioAudioRefObj.current.currentTime = time;
      setScenarioCurrentTime(time);
    }
  };
  const handlePlayUpload = () => {
    if (audioRef.current) {
      setIsPlayingUpload(true);
      audioRef.current.play();
      audioRef.current.onended = () => {
        setIsPlayingUpload(false);
        setAudioCurrentTime(0);
      };
    }
  };
  const handleStopUpload = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingUpload(false);
      setAudioCurrentTime(0);
    }
  };
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioCurrentTime(time);
    }
  };
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear scenario when uploading file
      setSelectedScenario(null);
      setIsPlaying(false);
      setShowResult(false);
      
      setUploadedFile(file);
      // Create a blob URL for the audio player
      const audioUrl = URL.createObjectURL(file);
      setUploadedAudioUrl(audioUrl);
      setShowResult(false);
      setUploadResult(null);
      setIsAnalyzingUpload(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_URL}/api/predict`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Prediction result:", data);

        // Map backend response to frontend display format
        const riskType = data.risk.riskType || (data.risk.level.includes("High Risk") ? "scam" : data.risk.level.includes("Medium Risk") ? "suspicious" : "safe");
        const nonhumanPercent = (data.y_prob.nonhuman * 100).toFixed(1);
        const humanPercent = (data.y_prob.human * 100).toFixed(1);
        
        // Generate detailed analysis message
        let analysisText = `${data.risk.level}\n`;
        if (riskType === "scam") {
          analysisText += `AI: ${nonhumanPercent}% detected\nBe cautious with this caller`;
        } else if (riskType === "suspicious") {
          analysisText += `AI: ${nonhumanPercent}% detected\nVerify caller identity`;
        } else {
          analysisText += `Human: ${humanPercent}% confirmed\nCaller appears legitimate`;
        }
        
        setUploadResult({
          result: riskType,
          analysis: analysisText,
        });
      } catch (error) {
        console.error("Upload error:", error);
        setUploadResult({
          result: "safe",
          analysis: `Failed to analyze audio. Please ensure backend is running on ${API_URL}`,
        });
      } finally {
        setIsAnalyzingUpload(false);
      }
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const displayResult = uploadResult;
  const isAnalyzing = isPlaying || isAnalyzingUpload;
  
  return <section id="demo" className="py-24 relative">
      {/* Hidden audio element for scenario playback */}
      <audio 
        ref={scenarioAudioRefObj}
        src={selectedScenario?.sampleFile || ""}
        onTimeUpdate={handleScenarioTimeUpdate}
        onLoadedMetadata={handleScenarioLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
        }}
        className="hidden"
      />
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
              {scenarios.map(scenario => <div key={scenario.id} className={`w-full p-4 rounded-xl transition-all duration-300 ${selectedScenario && selectedScenario.id === scenario.id && !isRecording ? "glass-card shadow-lg border-primary/50" : "bg-muted/50 hover:bg-muted"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{scenario.title}</p>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      
                      <button onClick={() => selectedScenario && selectedScenario.id === scenario.id && isPlaying ? handleStopScenario() : handlePlayScenario(scenario)} disabled={isAnalyzingUpload || isRecording} className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100">
                        {selectedScenario && selectedScenario.id === scenario.id && isPlaying ? (
                          <Square className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                        ) : (
                          <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Scenario Audio Player - On Same Card */}
                  {selectedScenario?.id === scenario.id && scenario.sampleFile && isPlaying && (
                    <div className="pt-3  space-y-2">
                      {/* Time and Duration */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(scenarioCurrentTime)} / {formatTime(scenarioDuration)}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <input 
                        type="range" 
                        min="0" 
                        max={scenarioDuration || 0}
                        value={scenarioCurrentTime}
                        onChange={handleScenarioSeek}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(scenarioCurrentTime / scenarioDuration) * 100}%, hsl(var(--muted-foreground) / 0.3) ${(scenarioCurrentTime / scenarioDuration) * 100}%, hsl(var(--muted-foreground) / 0.3) 100%)`
                        }}
                      />
                    </div>
                  )}
                </div>)}
            </div>

            {/* Uploaded file display */}
            {uploadedFile && <div className="p-4 rounded-xl glass-card border-primary/50 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileAudio className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {uploadedAudioUrl && (
                    <button 
                      onClick={isPlayingUpload ? handleStopUpload : handlePlayUpload}
                      disabled={isAnalyzingUpload}
                      className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                    >
                      {isPlayingUpload ? (
                        <Square className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                      )}
                    </button>
                  )}
                </div>
                {uploadedAudioUrl && (
                  <div className="space-y-2">
                    {/* Time and Duration */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(audioCurrentTime)} / {formatTime(audioDuration)}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <input 
                      type="range" 
                      min="0" 
                      max={audioDuration || 0}
                      value={audioCurrentTime}
                      onChange={handleSeek}
                      disabled={isAnalyzingUpload}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(audioCurrentTime / audioDuration) * 100}%, hsl(var(--muted-foreground) / 0.3) ${(audioCurrentTime / audioDuration) * 100}%, hsl(var(--muted-foreground) / 0.3) 100%)`
                      }}
                    />
                    
                    <audio 
                      ref={audioRef}
                      src={uploadedAudioUrl}
                      onTimeUpdate={handleAudioTimeUpdate}
                      onLoadedMetadata={handleAudioLoadedMetadata}
                      className="hidden"
                    />
                  </div>
                )}
              </div>}

            <div className="flex gap-4">
              <Button variant="hero" size="lg" onClick={handleRecord} disabled={isAnalyzingUpload} className={isRecording ? "animate-pulse bg-destructive hover:bg-destructive/90" : ""}>
                {isRecording ? <>
                    <Circle className="w-5 h-5 fill-current" />
                    Stop Recording
                  </> : <>
                    <Mic className="w-5 h-5" />
                    Record
                  </>}
              </Button>
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              <Button variant="glass" size="lg" onClick={handleUploadClick} disabled={isAnalyzingUpload || isRecording}>
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
                        {isRecording ? "Live Recording" : uploadedFile ? uploadedFile.name.split('.')[0] : selectedScenario?.title || "Select a Scenario"}
                      </p>
                    </div>

                    {/* Waveform animation */}
                    <div className="h-24 flex items-center justify-center gap-1">
                      {[...Array(20)].map((_, i) => <div key={i} className={`w-1 rounded-full transition-all duration-300 ${(isPlaying || isRecording || isAnalyzingUpload) ? "bg-primary animate-pulse" : "bg-muted"}`} style={{
                      height: (isPlaying || isRecording || isAnalyzingUpload) ? `${Math.random() * 60 + 20}%` : "20%",
                      animationDelay: `${i * 0.05}s`
                    }} />)}
                    </div>

                    {/* Analysis indicator */}
                    {isAnalyzingUpload && <div className="flex items-center justify-center gap-2 text-primary">
                        <Mic className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-medium">Analyzing voice...</span>
                      </div>}

                    {/* Recording indicator */}
                    {isRecording && !isAnalyzingUpload && <div className="flex items-center justify-center gap-2 text-destructive">
                        <Circle className="w-4 h-4 fill-current animate-pulse" />
                        <span className="text-sm font-medium">Recording audio...</span>
                      </div>}
                    {/* Result */}
                    {displayResult && !isRecording && <div className={`p-4 rounded-2xl space-y-3 animate-popup ${
                      displayResult.result === "scam" ? "bg-destructive/10 border border-destructive/20" :
                      displayResult.result === "suspicious" ? "bg-amber-500/10 border border-amber-500/20" :
                      "bg-green-500/10 border border-green-500/20"
                    }`}>
                        <div className="flex items-center gap-2">
                          {displayResult.result === "scam" ? <>
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                              <span className="font-semibold text-destructive">Scam Detected</span>
                            </> : displayResult.result === "suspicious" ? <>
                              <AlertTriangle className="w-5 h-5 text-amber-500" />
                              <span className="font-semibold text-amber-500">Suspicious Call</span>
                            </> : <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-semibold text-green-500">{displayResult.analysis.split('\n')[0]}</span>
                            </>}
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {displayResult.analysis.split('\n').slice(1).join('\n')}
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