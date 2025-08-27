import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Server, Database, Wifi, HardDrive, Cpu, MemoryStick, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface SystemMetric {
  name: string
  value: number
  status: "normal" | "warning" | "critical"
  unit: string
  trend: "up" | "down" | "stable"
}

interface ServiceStatus {
  name: string
  status: "online" | "offline" | "maintenance"
  uptime: string
  responseTime: number
  lastCheck: string
}

export default function AdminMonitor() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 45, status: "normal", unit: "%", trend: "stable" },
    { name: "Memory Usage", value: 67, status: "warning", unit: "%", trend: "up" },
    { name: "Disk Usage", value: 32, status: "normal", unit: "%", trend: "stable" },
    { name: "Network I/O", value: 78, status: "warning", unit: "MB/s", trend: "up" },
    { name: "Database Load", value: 23, status: "normal", unit: "%", trend: "down" },
    { name: "Cache Hit Rate", value: 94, status: "normal", unit: "%", trend: "stable" }
  ])

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "ADAS Processing Engine",
      status: "online",
      uptime: "99.98%",
      responseTime: 125,
      lastCheck: "30 seconds ago"
    },
    {
      name: "Video Analysis Service",
      status: "online",
      uptime: "99.95%",
      responseTime: 89,
      lastCheck: "45 seconds ago"
    },
    {
      name: "Camera Stream Handler",
      status: "online",
      uptime: "99.99%",
      responseTime: 67,
      lastCheck: "20 seconds ago"
    },
    {
      name: "Database Service",
      status: "online",
      uptime: "100%",
      responseTime: 12,
      lastCheck: "15 seconds ago"
    },
    {
      name: "Authentication Service",
      status: "maintenance",
      uptime: "99.92%",
      responseTime: 0,
      lastCheck: "5 minutes ago"
    },
    {
      name: "Storage Service",
      status: "online",
      uptime: "99.87%",
      responseTime: 156,
      lastCheck: "25 seconds ago"
    }
  ])

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        status: metric.value > 80 ? "critical" : metric.value > 60 ? "warning" : "normal"
      })))
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMetricColor = (status: SystemMetric['status']) => {
    switch (status) {
      case "normal": return "bg-success"
      case "warning": return "bg-warning"
      case "critical": return "bg-destructive"
      default: return "bg-muted"
    }
  }

  const getServiceStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case "online": return "bg-success text-success-foreground"
      case "offline": return "bg-destructive text-destructive-foreground"
      case "maintenance": return "bg-warning text-warning-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getServiceIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case "online": return <CheckCircle className="w-4 h-4" />
      case "offline": return <XCircle className="w-4 h-4" />
      case "maintenance": return <AlertTriangle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getTrendIcon = (trend: SystemMetric['trend']) => {
    switch (trend) {
      case "up": return "↗"
      case "down": return "↘"
      case "stable": return "→"
      default: return "→"
    }
  }

  const refreshMetrics = () => {
    setLastUpdated(new Date())
    // Simulate data refresh
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: Math.max(0, Math.min(100, Math.random() * 100))
    })))
  }

  const onlineServices = services.filter(s => s.status === 'online').length
  const offlineServices = services.filter(s => s.status === 'offline').length
  const maintenanceServices = services.filter(s => s.status === 'maintenance').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Monitor</h1>
          <p className="text-muted-foreground">Real-time system performance and health monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button onClick={refreshMetrics} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{onlineServices}</p>
                <p className="text-sm text-muted-foreground">Services Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{maintenanceServices}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{offlineServices}</p>
                <p className="text-sm text-muted-foreground">Services Down</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((onlineServices / services.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">System Health</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              Real-time performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {getTrendIcon(metric.trend)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {Math.round(metric.value)}{metric.unit}
                      </span>
                      <Badge className={
                        metric.status === 'normal' ? 'bg-success text-success-foreground' :
                        metric.status === 'warning' ? 'bg-warning text-warning-foreground' :
                        'bg-destructive text-destructive-foreground'
                      }>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" />
              Service Status
            </CardTitle>
            <CardDescription>
              Microservice health and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    {getServiceIcon(service.status)}
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs">
                      <p className="font-medium">
                        {service.status === 'online' ? `${service.responseTime}ms` : 'N/A'}
                      </p>
                      <p className="text-muted-foreground">{service.lastCheck}</p>
                    </div>
                    <Badge className={getServiceStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-accent" />
            Resource Usage
          </CardTitle>
          <CardDescription>
            Detailed system resource consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-medium">CPU Cores</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Core 1", usage: 45 },
                  { name: "Core 2", usage: 32 },
                  { name: "Core 3", usage: 67 },
                  { name: "Core 4", usage: 23 }
                ].map((core, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{core.name}</span>
                    <div className="flex items-center gap-2 w-24">
                      <Progress value={core.usage} className="h-1" />
                      <span className="text-xs">{core.usage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-4 h-4 text-success" />
                <span className="font-medium">Memory</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>10.4 GB / 16 GB</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>System: 4.2 GB</span>
                  <span>Apps: 6.2 GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-warning" />
                <span className="font-medium">Storage</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>485 GB / 1 TB</span>
                </div>
                <Progress value={48.5} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Videos: 320 GB</span>
                  <span>System: 165 GB</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}