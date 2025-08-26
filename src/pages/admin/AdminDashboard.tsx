import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Activity, Shield, TrendingUp, Server, Database, Cpu, HardDrive } from "lucide-react"

export default function AdminDashboard() {
  const systemStats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "+5%",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "System Health",
      value: "98.2%",
      change: "+0.5%",
      icon: Shield,
      color: "text-accent"
    },
    {
      title: "Data Processed",
      value: "45.8GB",
      change: "+23%",
      icon: Database,
      color: "text-warning"
    }
  ]

  const systemMetrics = [
    { name: "CPU Usage", value: 45, status: "normal" },
    { name: "Memory Usage", value: 67, status: "warning" },
    { name: "Disk Usage", value: 32, status: "normal" },
    { name: "Network Load", value: 78, status: "high" },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "High Memory Usage",
      severity: "warning",
      time: "5 min ago",
      description: "Memory usage exceeded 80% threshold"
    },
    {
      id: 2,
      type: "User Login Spike",
      severity: "info",
      time: "12 min ago",
      description: "Unusual increase in concurrent users"
    },
    {
      id: 3,
      type: "Storage Warning",
      severity: "medium",
      time: "25 min ago",
      description: "Video storage approaching capacity"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success text-success-foreground"
      case "warning": return "bg-warning text-warning-foreground"
      case "high": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground"
      case "warning": return "bg-warning text-warning-foreground"
      case "medium": return "bg-accent text-accent-foreground"
      case "info": return "bg-primary text-primary-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-dark rounded-xl p-6 text-white shadow-elegant">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80">System administration and monitoring</p>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
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
                {" from last week"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Metrics */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              System Metrics
            </CardTitle>
            <CardDescription>
              Real-time system performance monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{metric.value}%</span>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.status === 'normal' ? 'bg-success' :
                        metric.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-warning" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Recent system notifications and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks and system controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="w-5 h-5" />
              <span className="text-sm">Database</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Cpu className="w-5 h-5" />
              <span className="text-sm">System Logs</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <HardDrive className="w-5 h-5" />
              <span className="text-sm">Storage</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}