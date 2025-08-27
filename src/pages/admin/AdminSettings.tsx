import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Database, Mail, Bell, Lock, Server, Save, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()

  // System Settings
  const [systemName, setSystemName] = useState("ADAS Motorcycle System")
  const [systemDescription, setSystemDescription] = useState("Advanced Driver Assistance System for motorcycle safety and monitoring")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  // Security Settings
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")
  const [passwordMinLength, setPasswordMinLength] = useState("8")
  const [requireTwoFactor, setRequireTwoFactor] = useState(true)

  // ADAS Settings
  const [detectionSensitivity, setDetectionSensitivity] = useState("medium")
  const [videoRetentionDays, setVideoRetentionDays] = useState("30")
  const [maxFileSize, setMaxFileSize] = useState("500")
  const [enableRealTimeAnalysis, setEnableRealTimeAnalysis] = useState(true)

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [adminEmail, setAdminEmail] = useState("admin@adas-system.com")
  const [alertThreshold, setAlertThreshold] = useState("high")

  // Database Settings
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [dataCompression, setDataCompression] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Configuration */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              System Configuration
            </CardTitle>
            <CardDescription>
              General system settings and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemDescription">System Description</Label>
              <Textarea
                id="systemDescription"
                value={systemDescription}
                onChange={(e) => setSystemDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable system for maintenance
                </p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Debug Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable detailed logging and debugging
                </p>
              </div>
              <Switch
                checked={debugMode}
                onCheckedChange={setDebugMode}
              />
            </div>

            <Button 
              onClick={() => handleSaveSettings("System")}
              className="w-full bg-gradient-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              User authentication and security configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={maxLoginAttempts}
                  onChange={(e) => setMaxLoginAttempts(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Password Min Length</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={passwordMinLength}
                onChange={(e) => setPasswordMinLength(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Force 2FA for all admin accounts
                </p>
              </div>
              <Switch
                checked={requireTwoFactor}
                onCheckedChange={setRequireTwoFactor}
              />
            </div>

            <Button 
              onClick={() => handleSaveSettings("Security")}
              className="w-full"
              variant="outline"
            >
              <Lock className="w-4 h-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* ADAS Configuration */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              ADAS Configuration
            </CardTitle>
            <CardDescription>
              Advanced Driver Assistance System settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Detection Sensitivity</Label>
              <Select value={detectionSensitivity} onValueChange={setDetectionSensitivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="videoRetentionDays">Video Retention (days)</Label>
                <Input
                  id="videoRetentionDays"
                  type="number"
                  value={videoRetentionDays}
                  onChange={(e) => setVideoRetentionDays(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={maxFileSize}
                  onChange={(e) => setMaxFileSize(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Real-time Analysis</Label>
                <p className="text-sm text-muted-foreground">
                  Enable live video processing
                </p>
              </div>
              <Switch
                checked={enableRealTimeAnalysis}
                onCheckedChange={setEnableRealTimeAnalysis}
              />
            </div>

            <Button 
              onClick={() => handleSaveSettings("ADAS")}
              className="w-full"
              variant="outline"
            >
              <Settings className="w-4 h-4 mr-2" />
              Save ADAS Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure system alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Alert Threshold</Label>
              <Select value={alertThreshold} onValueChange={setAlertThreshold}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - All alerts</SelectItem>
                  <SelectItem value="medium">Medium - Important alerts</SelectItem>
                  <SelectItem value="high">High - Critical alerts only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send critical alerts via SMS
                </p>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Button 
              onClick={() => handleSaveSettings("Notifications")}
              className="w-full"
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Database Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database & Storage Settings
          </CardTitle>
          <CardDescription>
            Data management and storage configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Compression</Label>
                  <p className="text-sm text-muted-foreground">
                    Compress stored data
                  </p>
                </div>
                <Switch
                  checked={dataCompression}
                  onCheckedChange={setDataCompression}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Encryption Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt sensitive data
                  </p>
                </div>
                <Switch
                  checked={encryptionEnabled}
                  onCheckedChange={setEncryptionEnabled}
                />
              </div>

              <div className="space-y-2">
                <Label>Storage Status</Label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used Space</span>
                    <span>485 GB / 1 TB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '48.5%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => handleSaveSettings("Database")}
                className="w-full bg-gradient-primary"
              >
                <Database className="w-4 h-4 mr-2" />
                Save Database Settings
              </Button>

              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Run Backup Now
              </Button>

              <Button variant="destructive" className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}