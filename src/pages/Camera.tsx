import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera as CameraIcon, Square, Play, Pause, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Camera() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [detections, setDetections] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      // Cleanup stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)
        
        // Mock detection simulation
        setTimeout(() => {
          setDetections(["Lane Detection Active", "Vehicle Recognition Online"])
        }, 2000)
        
        toast({
          title: "Camera Started",
          description: "ADAS camera system is now active",
        })
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      })
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsStreaming(false)
    setIsRecording(false)
    setDetections([])
    
    toast({
      title: "Camera Stopped",
      description: "ADAS camera system has been deactivated",
    })
  }

  const toggleRecording = () => {
    if (!isStreaming) {
      toast({
        title: "Start Camera First",
        description: "Please start the camera before recording",
        variant: "destructive"
      })
      return
    }
    
    setIsRecording(!isRecording)
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Video recording has been stopped" : "Video recording has begun",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Camera Analysis</h1>
          <p className="text-muted-foreground">Real-time ADAS monitoring and detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={isStreaming ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
            {isStreaming ? "Live" : "Offline"}
          </Badge>
          {isRecording && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              Recording
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Camera Feed */}
        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CameraIcon className="w-5 h-5" />
                Live Camera Feed
              </CardTitle>
              <CardDescription>
                Real-time video analysis with ADAS detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="text-center">
                      <CameraIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Camera not active</p>
                    </div>
                  </div>
                )}

                {/* Detection Overlays */}
                {isStreaming && detections.length > 0 && (
                  <div className="absolute top-4 left-4 space-y-2">
                    {detections.map((detection, index) => (
                      <Badge key={index} className="bg-success/90 text-success-foreground">
                        {detection}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-4">
                {!isStreaming ? (
                  <Button onClick={startCamera} className="bg-gradient-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Start Camera
                  </Button>
                ) : (
                  <Button onClick={stopCamera} variant="destructive">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Camera
                  </Button>
                )}
                
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "secondary"}
                  disabled={!isStreaming}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                
                <Button variant="outline" disabled={!isStreaming}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detection Panel */}
        <div className="space-y-6">
          {/* Current Detections */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Active Detections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detections.length > 0 ? (
                  detections.map((detection, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded bg-success/10">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">{detection}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No active detections</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Session Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="text-sm font-medium">
                    {isStreaming ? "00:02:34" : "00:00:00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Detections</span>
                  <span className="text-sm font-medium">{detections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Alerts</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Frame Rate</span>
                  <span className="text-sm font-medium">
                    {isStreaming ? "30 FPS" : "0 FPS"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}