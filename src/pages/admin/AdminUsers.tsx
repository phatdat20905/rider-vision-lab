import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Filter, MoreHorizontal, UserPlus, Shield, Mail, Phone, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "user" | "premium"
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  joinDate: string
  sessionsCount: number
  safetyScore: number
  avatar?: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      role: "premium",
      status: "active",
      lastLogin: "2 hours ago",
      joinDate: "Jan 15, 2024",
      sessionsCount: 156,
      safetyScore: 94
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 234-5678",
      role: "user",
      status: "active",
      lastLogin: "1 day ago",
      joinDate: "Feb 3, 2024",
      sessionsCount: 89,
      safetyScore: 87
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+1 (555) 345-6789",
      role: "admin",
      status: "active",
      lastLogin: "30 min ago",
      joinDate: "Dec 10, 2023",
      sessionsCount: 312,
      safetyScore: 96
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emily.chen@example.com",
      phone: "+1 (555) 456-7890",
      role: "user",
      status: "inactive",
      lastLogin: "2 weeks ago",
      joinDate: "Mar 8, 2024",
      sessionsCount: 23,
      safetyScore: 79
    },
    {
      id: "5",
      name: "David Brown",
      email: "d.brown@example.com",
      phone: "+1 (555) 567-8901",
      role: "premium",
      status: "suspended",
      lastLogin: "1 month ago",
      joinDate: "Jan 22, 2024",
      sessionsCount: 67,
      safetyScore: 42
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const { toast } = useToast()

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case "admin": return "bg-primary text-primary-foreground"
      case "premium": return "bg-accent text-accent-foreground"
      case "user": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground"
      case "inactive": return "bg-muted text-muted-foreground"
      case "suspended": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 75) return "text-warning"
    return "text-destructive"
  }

  const updateUserStatus = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
    toast({
      title: "User Status Updated",
      description: `User status changed to ${newStatus}`,
    })
  }

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
      variant: "destructive"
    })
  }

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    premium: users.filter(u => u.role === 'premium').length,
    avgSafetyScore: Math.round(users.reduce((acc, u) => acc + u.safetyScore, 0) / users.length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-gradient-primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.active}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.premium}</p>
                <p className="text-sm text-muted-foreground">Premium Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.avgSafetyScore}%</p>
                <p className="text-sm text-muted-foreground">Avg Safety Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-smooth">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right text-sm">
                    <p className="font-medium">Last Login</p>
                    <p className="text-muted-foreground">{user.lastLogin}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">Sessions</p>
                    <p className="text-muted-foreground">{user.sessionsCount}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">Safety Score</p>
                    <p className={getSafetyScoreColor(user.safetyScore)}>
                      {user.safetyScore}%
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Select onValueChange={(value) => updateUserStatus(user.id, value as User['status'])}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activate</SelectItem>
                        <SelectItem value="inactive">Deactivate</SelectItem>
                        <SelectItem value="suspended">Suspend</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}