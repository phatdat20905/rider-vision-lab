import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Settings, Shield, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Profile() {
  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    })
  }

  const userStats = [
    { label: "Total Sessions", value: "156", icon: Activity },
    { label: "Safety Score", value: "94%", icon: Shield },
    { label: "Member Since", value: "Jan 2024", icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF (max 2MB)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="bg-gradient-primary">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* ADAS Preferences */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                ADAS Preferences
              </CardTitle>
              <CardDescription>
                Configure your Advanced Driver Assistance System settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lane Departure Warning</Label>
                    <p className="text-sm text-muted-foreground">Alert when drifting out of lane</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Forward Collision Warning</Label>
                    <p className="text-sm text-muted-foreground">Warn of potential frontal collisions</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Speed Limit Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify when exceeding speed limits</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">Moderate</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Blind Spot Detection</Label>
                    <p className="text-sm text-muted-foreground">Monitor blind spot areas</p>
                  </div>
                  <Badge className="bg-muted text-muted-foreground">Disabled</Badge>
                </div>
              </div>

              <Button variant="outline">
                Configure Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Stats & Activity */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Profile Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">Account Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm">Premium Member</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Verified
                </div>
                <div className="text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Verified
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Camera session completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Video analysis finished</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Safety alert triggered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}