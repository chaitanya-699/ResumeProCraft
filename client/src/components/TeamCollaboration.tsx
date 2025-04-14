import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, MessageSquare, SendHorizontal, Clock, Calendar, PanelRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const teamMembers = [
  { id: 1, name: "Sarah Johnson", role: "HR Manager", avatar: "/avatars/sarah.jpg", online: true },
  { id: 2, name: "Michael Chen", role: "Career Coach", avatar: "/avatars/michael.jpg", online: false },
  { id: 3, name: "Jessica Taylor", role: "Resume Expert", avatar: "/avatars/jessica.jpg", online: true },
];

const comments = [
  { 
    id: 1, 
    user: teamMembers[2], 
    text: "The experience section looks good, but consider adding more specific achievements with metrics.",
    timestamp: "2 hours ago",
    section: "experience"
  },
  { 
    id: 2, 
    user: teamMembers[0], 
    text: "Your summary is too generic. Let's tailor it more to the marketing industry since that's your target.",
    timestamp: "Yesterday, 3:45 PM",
    section: "summary"
  },
  { 
    id: 3, 
    user: teamMembers[1], 
    text: "I've scheduled a review session for tomorrow at 2 PM to go through the final draft together.",
    timestamp: "Yesterday, 10:30 AM",
    section: "general"
  },
];

const schedules = [
  { id: 1, title: "Resume Review", with: teamMembers[1], date: "Tomorrow, 2:00 PM", status: "confirmed" },
  { id: 2, title: "Mock Interview", with: teamMembers[0], date: "Aug 15, 10:00 AM", status: "pending" },
];

export default function TeamCollaboration() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("team");
  
  const addComment = () => {
    // In a real app, this would call an API to add the comment
    setCommentText("");
    // Show success toast or feedback
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg text-primary">
            <Users className="mr-2 h-5 w-5" />
            Team Collaboration
          </CardTitle>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600">Enterprise</Badge>
        </div>
        <CardDescription>
          Get feedback from your team and career experts
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="team" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Team Members (3)</h3>
                
                <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <UserPlus className="mr-1 h-4 w-4" />
                      Invite
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share with Team</DialogTitle>
                      <DialogDescription>
                        Invite team members to collaborate on your resume
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" placeholder="colleague@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="e.g. HR Manager, Career Coach" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setIsShareDialogOpen(false)}>
                        Send Invitation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{member.name}</p>
                          <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="mt-0">
            <div className="space-y-4">
              <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">{comment.user.name}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{comment.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {comment.section === "general" ? "General" : `${comment.section.charAt(0).toUpperCase() + comment.section.slice(1)} section`}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex items-center gap-2 pt-2 border-t">
                <Input 
                  placeholder="Add a comment..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  onClick={addComment}
                  disabled={!commentText.trim()}
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-0">
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-md p-2 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{schedule.title}</p>
                        <Badge 
                          variant={schedule.status === "confirmed" ? "default" : "secondary"}
                          className={`text-xs ${schedule.status === "confirmed" ? '' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}
                        >
                          {schedule.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>With {schedule.with.name}</span>
                        <span>•</span>
                        <span>{schedule.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 