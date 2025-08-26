import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bike, Plus, Edit, Trash2, Settings, Activity, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Vehicle {
  id: string
  name: string
  model: string
  year: number
  licensePlate: string
  status: "active" | "inactive" | "maintenance"
  adasEnabled: boolean
  lastUsed: string
  totalMiles: number
  safetyScore: number
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Daily Commuter",
      model: "Yamaha R15",
      year: 2023,
      licensePlate: "ABC-1234",
      status: "active",
      adasEnabled: true,
      lastUsed: "2 hours ago",
      totalMiles: 15420,
      safetyScore: 94
    },
    {
      id: "2",
      name: "Weekend Rider",
      model: "Honda CBR 600RR",
      year: 2022,
      licensePlate: "XYZ-5678",
      status: "inactive",
      adasEnabled: true,
      lastUsed: "3 days ago",
      totalMiles: 8750,
      safetyScore: 87
    },
    {
      id: "3",
      name: "Track Bike",
      model: "Kawasaki Ninja ZX-10R",
      year: 2024,
      licensePlate: "TRK-9999",
      status: "maintenance",
      adasEnabled: false,
      lastUsed: "1 week ago",
      totalMiles: 3200,
      safetyScore: 91
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground"
      case "inactive": return "bg-muted text-muted-foreground"
      case "maintenance": return "bg-warning text-warning-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 75) return "text-warning"
    return "text-destructive"
  }

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id))
    toast({
      title: "Vehicle Removed",
      description: "Vehicle has been removed from your fleet",
    })
  }

  const toggleADAS = (id: string) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id 
        ? { ...vehicle, adasEnabled: !vehicle.adasEnabled }
        : vehicle
    ))
    toast({
      title: "ADAS Settings Updated",
      description: "Vehicle ADAS configuration has been changed",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage your motorcycle fleet and ADAS settings</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Add Vehicle Form */}
      {showAddForm && (
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Vehicle
            </CardTitle>
            <CardDescription>
              Register a new motorcycle in your fleet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleName">Vehicle Name</Label>
                <Input id="vehicleName" placeholder="e.g., Daily Commuter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="e.g., Yamaha R15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input id="licensePlate" placeholder="ABC-1234" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-primary">
                Add Vehicle
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="glass hover:shadow-card transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Bike className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.model} ({vehicle.year})
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(vehicle.status)}>
                  {vehicle.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vehicle Info */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>License Plate</span>
                  <span className="font-medium">{vehicle.licensePlate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Used</span>
                  <span className="font-medium">{vehicle.lastUsed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Miles</span>
                  <span className="font-medium">{vehicle.totalMiles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Safety Score</span>
                  <span className={`font-medium ${getSafetyScoreColor(vehicle.safetyScore)}`}>
                    {vehicle.safetyScore}%
                  </span>
                </div>
              </div>

              {/* ADAS Status */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">ADAS System</span>
                </div>
                <Badge 
                  className={vehicle.adasEnabled ? 
                    "bg-success text-success-foreground" : 
                    "bg-muted text-muted-foreground"
                  }
                >
                  {vehicle.adasEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleADAS(vehicle.id)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  ADAS
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => deleteVehicle(vehicle.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fleet Overview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Fleet Overview
          </CardTitle>
          <CardDescription>
            Summary of your vehicle fleet statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{vehicles.length}</div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {vehicles.filter(v => v.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {vehicles.filter(v => v.adasEnabled).length}
              </div>
              <p className="text-sm text-muted-foreground">ADAS Enabled</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {Math.round(vehicles.reduce((acc, v) => acc + v.safetyScore, 0) / vehicles.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Avg Safety Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}