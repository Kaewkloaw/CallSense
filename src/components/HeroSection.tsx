import { Play, Shield, Phone, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'var(--gradient-glow)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Powered by KBTG × Samsung</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="gradient-text">Protect</span> Your Calls
              <br />
              From <span className="gradient-text">Scammers</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Advanced AI-powered call protection that detects fraud in real-time. 
              On-device processing for maximum privacy and speed.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl">
                <Shield className="w-5 h-5" />
                Start Protection
              </Button>
              <Button variant="glass" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <p className="font-display text-3xl font-bold gradient-text">99.7%</p>
                <p className="text-sm text-muted-foreground">Detection Rate</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold gradient-text">50ms</p>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold gradient-text">10M+</p>
                <p className="text-sm text-muted-foreground">Calls Protected</p>
              </div>
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="relative flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl opacity-40" style={{ background: 'var(--gradient-hero)' }} />
              
              {/* Phone */}
              <div className="relative phone-mockup w-72 md:w-80 animate-float">
                <div className="phone-screen aspect-[9/19] flex flex-col">
                  {/* Status bar */}
                  <div className="h-12 px-6 flex items-center justify-between bg-card">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="w-20 h-6 rounded-full bg-foreground/10" />
                    <div className="flex gap-1">
                      <div className="w-4 h-3 rounded-sm bg-foreground/30" />
                    </div>
                  </div>
                  
                  {/* Call screen */}
                  <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
                    <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-glow animate-glow-pulse">
                      <Phone className="w-10 h-10 text-primary-foreground" />
                    </div>
                    
                    <div className="text-center space-y-1">
                      <p className="font-display text-xl font-semibold">Unknown Caller</p>
                      <p className="text-sm text-muted-foreground">+66 2-XXX-XXXX</p>
                    </div>

                    {/* Alert banner */}
                    <div className="w-full p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-destructive" />
                        <span className="font-semibold text-destructive">Scam Detected</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        AI Voice pattern detected. This call matches known scam patterns.
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium">
                        Block
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-8 top-1/4 glass-card px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">AI Voice Check</span>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 glass-card px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Verified Caller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
