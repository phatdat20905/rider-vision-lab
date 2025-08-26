import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Play, Pause, Video, FileVideo, Trash2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VideoAnalysis {
  id: string
  name: string
  size: string
  duration: string
  status: "processing" | "completed" | "error"
  detections: number
  alerts: number
  uploadDate: string
}

export default function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [videos, setVideos] = useState<VideoAnalysis[]>([
    {
      id: "1",
      name: "highway_ride.mp4",
      size: "125 MB",
      duration: "05:23",
      status: "completed",
      detections: 47,
      alerts: 2,
      uploadDate: "2 hours ago"
    },
    {
      id: "2", 
      name: "city_traffic.mp4",
      size: "89 MB",
      duration: "03:45",
      status: "processing",
      detections: 23,
      alerts: 1,
      uploadDate: "15 min ago"
    }
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a video file (MP4, AVI, MOV, etc.)",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a video file smaller than 500MB",
        variant: "destructive"
      })
      return
    }

    // Simulate upload process
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          
          // Add new video to list
          const newVideo: VideoAnalysis = {
            id: Date.now().toString(),
            name: file.name,
            size: `${Math.round(file.size / 1024 / 1024)} MB`,
            duration: "Unknown",
            status: "processing",
            detections: 0,
            alerts: 0,
            uploadDate: "Just now"
          }
          
          setVideos(prev => [newVideo, ...prev])
          
          toast({
            title: "Upload Complete",
            description: "Video is now being processed for ADAS analysis",
          })
          
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id))
    toast({
      title: "Video Deleted",
      description: "Video has been removed from your library",
    })
  }

  const getStatusColor = (status: VideoAnalysis['status']) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground"
      case "processing": return "bg-warning text-warning-foreground"
      case "error": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Video Upload & Analysis</h1>
        <p className="text-muted-foreground">Upload videos for ADAS analysis and review results</p>
      </div>

      {/* Upload Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Video
          </CardTitle>
          <CardDescription>
            Upload MP4, AVI, MOV files up to 500MB for ADAS analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
            <FileVideo className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            
            {isUploading ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Uploading video...</p>
                <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}% complete</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Drag and drop your video file here, or click to select
                </p>
                <Button onClick={handleFileSelect} className="bg-gradient-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Video File
                </Button>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Video Library */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Library
          </CardTitle>
          <CardDescription>
            Your uploaded videos and their analysis results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {videos.length > 0 ? (
            <div className="space-y-4">
              {videos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-smooth">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileVideo className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{video.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{video.size}</span>
                        <span>{video.duration}</span>
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                    
                    {video.status === "completed" && (
                      <div className="text-sm text-muted-foreground">
                        {video.detections} detections • {video.alerts} alerts
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {video.status === "completed" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteVideo(video.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileVideo className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No videos uploaded yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}