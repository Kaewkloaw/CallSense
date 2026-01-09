import { Phone, Brain, Shield, Bell } from "lucide-react";
import { useState, useRef, useEffect } from 'react';

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Call Initiated",
    description: "When you receive a call, Callsense immediately activates and begins monitoring.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analysis",
    description: "Our AI analyzes voice patterns, caller ID, and conversation patterns just-in-time.",
  },
  {
    icon: Shield,
    step: "03",
    title: "Threat Detection",
    description: "Any suspicious patterns trigger our multi-layer detection system for verification.",
  },
  {
    icon: Bell,
    step: "04",
    title: "Instant Alert",
    description: "You receive immediate visual and audio alerts if a threat is detected.",
  },
];

export function HowItWorksSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            How <span className="gradient-text">Callsense</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Protection happens in milliseconds, completely transparent to you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card */}
                <div className="relative p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-500 text-center space-y-4">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-bg text-primary-foreground text-xs font-bold">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-primary/50 text-2xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


        <div className="mt-20 max-w-4xl mx-auto">
          <div
            className="aspect-video rounded-3xl overflow-hidden glass-card shadow-2xl relative group cursor-pointer bg-black"
            onClick={handlePlayVideo}
          >
            <video
              ref={videoRef}
              // poster="/callsenseThumbnail.jpg"
              className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              controls={isPlaying}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/callsenseDemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 gradient-bg opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="w-0 h-0 border-l-[16px] border-l-primary-foreground border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-xl font-semibold text-foreground">Watch Full Demo Video</p>
                  <p className="text-sm text-muted-foreground">See Callsense in action protecting real users</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
