import { 
  Shield, 
  Mic, 
  AlertTriangle, 
  CheckCircle, 
  Smartphone, 
  Zap,
  Brain
} from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Verified Caller ID",
    description: "Companies are verified before calling you. See trust badges for legitimate businesses.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Smartphone,
    title: "No App Required",
    description: "Works directly on your device without downloading any apps. Seamless integration.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mic,
    title: "AI Voice Detection",
    description: "Advanced AI detects synthetic voices and deepfakes in just-in-time during calls.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "Pattern Recognition",
    description: "Detects scam patterns including suspicious keywords and emotional manipulation.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: AlertTriangle,
    title: "Just-in-Time Alerts",
    description: "Get instant visual when suspicious activity is detected.",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Comprehensive protection against all types of phone scams and malicious callers.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: 'var(--gradient-glow)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Core Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Complete <span className="gradient-text">Protection</span> Suite
          </h2>
          <p className="text-lg text-muted-foreground">
            End-to-end protection from the moment your phone rings. 
            Powered by cutting-edge AI and just-in-time analysis.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'var(--gradient-primary)', padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              
              <div className="relative space-y-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
