import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Camera, Video, Activity, TrendingUp, Users } from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from "@/assets/adas-hero.jpg"

export default function Welcome() {
  const features = [
    {
      icon: Camera,
      title: "Real-time Camera Analysis",
      description: "Live ADAS monitoring with instant safety alerts and lane detection",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Video Upload & Processing",
      description: "Upload and analyze recorded videos for comprehensive safety assessment",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Advanced Safety Features",
      description: "Forward collision warning, lane departure alerts, and speed monitoring",
      color: "text-success"
    },
    {
      icon: Activity,
      title: "Performance Analytics",
      description: "Track safety scores, driving patterns, and improvement opportunities",
      color: "text-warning"
    }
  ]

  const stats = [
    { value: "98.5%", label: "Safety Accuracy", icon: Shield },
    { value: "24/7", label: "Real-time Monitoring", icon: Activity },
    { value: "1000+", label: "Active Users", icon: Users },
    { value: "45ms", label: "Response Time", icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Advanced Driver Assistance System
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    ADAS
                  </span>{" "}
                  <span className="text-foreground">
                    Motorcycle Safety System
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Experience the future of motorcycle safety with AI-powered real-time monitoring, 
                  intelligent alerts, and comprehensive analytics for safer rides.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/camera">
                    <Camera className="w-5 h-5 mr-2" />
                    Start Live Analysis
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/video">
                    <Video className="w-5 h-5 mr-2" />
                    Upload Video
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-lg">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="ADAS Motorcycle System Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-4 right-4 glass p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-foreground font-medium">System Active</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 glass p-3 rounded-lg">
                <div className="text-sm">
                  <div className="text-foreground font-medium">Lane Detection</div>
                  <div className="text-success text-xs">98% Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI-powered system provides real-time analysis and intelligent alerts 
              to keep you safe on every ride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-muted/50 flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Enhance Your Safety?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of riders who trust our ADAS system for safer journeys. 
            Start your safety analysis today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/">
                <Shield className="w-5 h-5 mr-2" />
                View Dashboard
              </Link>  
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/profile">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}