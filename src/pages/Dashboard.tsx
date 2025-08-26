import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Camera, Shield, TrendingUp, Users, Video } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Active Sessions",
      value: "12",
      change: "+2.1%",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Safety Alerts",
      value: "3",
      change: "-12%",
      icon: Shield,
      color: "text-warning"
    },
    {
      title: "Videos Analyzed",
      value: "847",
      change: "+8.2%",
      icon: Video,
      color: "text-primary"
    },
    {
      title: "Connected Users",
      value: "24",
      change: "+4.1%",
      icon: Users,
      color: "text-accent"
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "Lane Departure",
      severity: "medium",
      time: "2 min ago",
      vehicle: "Yamaha R15"
    },
    {
      id: 2,
      type: "Forward Collision",
      severity: "high",
      time: "5 min ago",
      vehicle: "Honda CBR"
    },
    {
      id: 3,
      type: "Speed Warning",
      severity: "low",
      time: "8 min ago",
      vehicle: "Kawasaki Ninja"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground"
      case "medium": return "bg-warning text-warning-foreground"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-elegant">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ADAS Dashboard</h1>
            <p className="text-primary-foreground/80">Advanced Driver Assistance System for Motorcycles</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover:shadow-card transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                {" from last hour"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Alerts */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              Recent Safety Alerts
            </CardTitle>
            <CardDescription>
              Latest ADAS warnings and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.vehicle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" />
              System Status
            </CardTitle>
            <CardDescription>
              Current system performance and health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Camera System</span>
                <Badge className="bg-success text-success-foreground">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Processing</span>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Storage</span>
                <Badge className="bg-warning text-warning-foreground">75% Used</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Connection</span>
                <Badge className="bg-success text-success-foreground">Stable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}