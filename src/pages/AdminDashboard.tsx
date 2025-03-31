
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UsersTable from "@/components/admin/UsersTable";
import ServiceEditor from "@/components/admin/ServiceEditor";
import MessagesList from "@/components/admin/MessagesList";
import FooterSocialEditor from "@/components/admin/FooterSocialEditor";
import LegalEditor from "@/components/admin/LegalEditor";
import PageEditor from "@/components/admin/PageEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Calendar, Mail, Phone, Info, User, Settings, Layout, Database, FileText } from "lucide-react";
import { TeamMemberType } from "@/context/DataContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    orders, 
    siteContent, 
    aboutContent, 
    updateSiteContent, 
    updateAboutContent, 
    updateOrderStatus, 
    services, 
    messages,
    updateFooterLinks,
    updateLegalContent,
    footerLinks,
    legalContent
  } = useData();
  
  const [content, setContent] = useState(siteContent);
  const [about, setAbout] = useState(aboutContent);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newTeamMember, setNewTeamMember] = useState<TeamMemberType>({
    name: "",
    role: "",
    bio: "",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  });

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user || user.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, navigate, toast]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [orders, statusFilter]);

  // Update local state when context changes
  useEffect(() => {
    setContent(siteContent);
  }, [siteContent]);

  useEffect(() => {
    setAbout(aboutContent);
  }, [aboutContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAbout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTeamMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentSave = () => {
    updateSiteContent(content);
    toast({
      title: "Content Updated",
      description: "Website content has been updated successfully.",
    });
  };

  const handleAboutSave = () => {
    updateAboutContent(about);
    toast({
      title: "About Content Updated",
      description: "About page content has been updated successfully.",
    });
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role || !newTeamMember.bio) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the team member.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedTeam = [...about.team, newTeamMember];
    setAbout(prev => ({
      ...prev,
      team: updatedTeam
    }));
    
    setNewTeamMember({
      name: "",
      role: "",
      bio: "",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    });
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedTeam = [...about.team];
    updatedTeam.splice(index, 1);
    setAbout(prev => ({
      ...prev,
      team: updatedTeam
    }));
  };

  const handleStatusChange = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: "Status Updated",
      description: `Order status has been updated to ${newStatus}.`,
    });
  };

  const handleImageUpload = (field: string, image: string) => {
    setContent(prev => ({
      ...prev,
      [field]: image
    }));
  };

  const handleTeamImageUpload = (index: number | null, image: string) => {
    if (index === null) {
      setNewTeamMember(prev => ({
        ...prev,
        image
      }));
    } else {
      const updatedTeam = [...about.team];
      updatedTeam[index].image = image;
      setAbout(prev => ({
        ...prev,
        team: updatedTeam
      }));
    }
  };

  if (!user || user.role !== "admin") {
    return null; // Don't render anything if not admin
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage website content, orders, users and messages</p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-9 md:inline-flex">
              <TabsTrigger value="dashboard" className="flex items-center gap-1">
                <Layout className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="pages">
                <FileText className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">Pages</span>
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Database className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="services">
                <Settings className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="about">
                <Info className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">About</span>
              </TabsTrigger>
              <TabsTrigger value="users">
                <User className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="messages">
                <Mail className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="social">
                <svg className="h-4 w-4 md:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span className="hidden md:inline">Social</span>
              </TabsTrigger>
              <TabsTrigger value="legal">
                <svg className="h-4 w-4 md:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="hidden md:inline">Legal</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{orders.length}</CardTitle>
                    <CardDescription>Total Orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-medium">{orders.filter(o => o.status === 'pending').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Progress:</span>
                        <span className="font-medium">{orders.filter(o => o.status === 'in-progress').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-medium">{orders.filter(o => o.status === 'completed').length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{messages.length}</CardTitle>
                    <CardDescription>Messages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Unread:</span>
                        <span className="font-medium">{messages.filter(m => !m.isRead).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Read:</span>
                        <span className="font-medium">{messages.filter(m => m.isRead).length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{services.length}</CardTitle>
                    <CardDescription>Services</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Manage your services and pricing in the Services tab.
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">Quick Links</CardTitle>
                    <CardDescription>Shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Homepage
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      View Messages
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest 5 orders received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div>
                            <div className="font-medium">{order.serviceType}</div>
                            <div className="text-sm text-gray-600">{order.userName}</div>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "completed" ? "bg-green-100 text-green-800" :
                              order.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                              order.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Latest 5 messages received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.slice(0, 5).map((message) => (
                        <div key={message.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div>
                            <div className="font-medium">{message.subject}</div>
                            <div className="text-sm text-gray-600">{message.name}</div>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              message.isRead ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {message.isRead ? "Read" : "Unread"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pages Tab */}
            <TabsContent value="pages">
              <PageEditor />
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Orders</CardTitle>
                  <CardDescription>
                    View and manage customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Label htmlFor="statusFilter">Filter by Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-6">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className={`h-2 ${
                            order.status === "completed" ? "bg-green-500" :
                            order.status === "in-progress" ? "bg-blue-500" :
                            order.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                          }`} />
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{order.serviceType}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-1">
                                  <Calendar className="h-4 w-4 mr-1" /> 
                                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                                <p className="text-gray-500 text-sm mb-2">
                                  Order ID: {order.id}
                                </p>
                                
                                <div className="mt-4">
                                  <h4 className="font-medium text-sm mb-1">Customer Details</h4>
                                  <div className="space-y-1 mb-2">
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-2 text-gray-500" />
                                      <p>{order.userName}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                      <p className="text-gray-700">{order.userEmail}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <Info className="h-4 w-4 mr-2 text-gray-500" />
                                      <p>User ID: {order.userId}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                {order.businessType && (
                                  <div className="mt-2">
                                    <h4 className="font-medium text-sm mb-1">Project Type</h4>
                                    <p className="bg-gray-100 px-2 py-1 rounded text-gray-700 inline-block">{order.businessType}</p>
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="mb-4">
                                  <h4 className="font-medium text-sm mb-1">Project Details</h4>
                                  <p className="text-gray-600 bg-gray-50 p-3 rounded border">{order.details}</p>
                                </div>
                                {order.requirements && (
                                  <div className="mb-4">
                                    <h4 className="font-medium text-sm mb-1">Specific Requirements</h4>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded border">{order.requirements}</p>
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-medium text-sm mb-1">Status</h4>
                                  <Select 
                                    defaultValue={order.status}
                                    onValueChange={(value) => handleStatusChange(
                                      order.id, 
                                      value
                                    )}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button size="sm">Contact Customer</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium mb-2">No orders found</h3>
                        <p className="text-gray-500">
                          {statusFilter === "all" 
                            ? "There are no orders in the system." 
                            : `There are no orders with status: ${statusFilter}.`}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services">
              <ServiceEditor />
            </TabsContent>
            
            {/* About Content Tab */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Page Content</CardTitle>
                  <CardDescription>
                    Update the content displayed on your about page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="story">Our Story</Label>
                      <Textarea 
                        id="story" 
                        name="story" 
                        value={about.story} 
                        onChange={handleAboutChange}
                        rows={4} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mission">Our Mission</Label>
                      <Textarea 
                        id="mission" 
                        name="mission" 
                        value={about.mission} 
                        onChange={handleAboutChange}
                        rows={3} 
                      />
                    </div>
                    
                    <div>
                      <Label>Team Image</Label>
                      <div className="mt-2">
                        <ImageUploader 
                          currentImage={about.teamImage}
                          onImageUpload={(image) => setAbout(prev => ({...prev, teamImage: image}))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Team Members</Label>
                      </div>
                      
                      <div className="space-y-4">
                        {about.team.map((member, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                  <div className="relative">
                                    <img 
                                      src={member.image} 
                                      alt={member.name}
                                      className="w-12 h-12 rounded-full object-cover" 
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="absolute bottom-0 -right-2"
                                      onClick={() => {
                                        // Trigger hidden file input
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                          const file = (e.target as HTMLInputElement).files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                              const result = reader.result as string;
                                              handleTeamImageUpload(index, result);
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        };
                                        input.click();
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                  <div>
                                    <Input 
                                      value={member.name}
                                      onChange={(e) => {
                                        const updatedTeam = [...about.team];
                                        updatedTeam[index].name = e.target.value;
                                        setAbout(prev => ({...prev, team: updatedTeam}));
                                      }}
                                      className="font-semibold mb-1"
                                    />
                                    <Input 
                                      value={member.role}
                                      onChange={(e) => {
                                        const updatedTeam = [...about.team];
                                        updatedTeam[index].role = e.target.value;
                                        setAbout(prev => ({...prev, team: updatedTeam}));
                                      }}
                                      className="text-sm text-gray-500"
                                    />
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleRemoveTeamMember(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="mt-3">
                                <Textarea 
                                  value={member.bio}
                                  onChange={(e) => {
                                    const updatedTeam = [...about.team];
                                    updatedTeam[index].bio = e.target.value;
                                    setAbout(prev => ({...prev, team: updatedTeam}));
                                  }}
                                  rows={2}
                                  className="text-sm"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Add Team Member</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label htmlFor="memberName">Name</Label>
                                <Input 
                                  id="memberName" 
                                  name="name" 
                                  value={newTeamMember.name} 
                                  onChange={handleTeamMemberChange} 
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="memberRole">Role</Label>
                                <Input 
                                  id="memberRole" 
                                  name="role" 
                                  value={newTeamMember.role} 
                                  onChange={handleTeamMemberChange} 
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="memberBio">Bio</Label>
                              <Textarea 
                                id="memberBio" 
                                name="bio" 
                                value={newTeamMember.bio} 
                                onChange={handleTeamMemberChange} 
                                rows={2} 
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <Label>Member Image</Label>
                              <ImageUploader 
                                currentImage={newTeamMember.image}
                                onImageUpload={(image) => handleTeamImageUpload(null, image)}
                                label="Upload Member Image"
                              />
                            </div>
                            
                            <Button 
                              type="button" 
                              className="w-full"
                              onClick={handleAddTeamMember}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Team Member
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Button onClick={handleAboutSave} className="w-full">
                      Save All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <UsersTable />
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent value="messages">
              <MessagesList />
            </TabsContent>

            {/* Social Tab */}
            <TabsContent value="social">
              <FooterSocialEditor 
                initialSocialLinks={footerLinks} 
                onSave={updateFooterLinks} 
              />
            </TabsContent>

            {/* Legal Tab */}
            <TabsContent value="legal">
              <LegalEditor 
                initialContent={legalContent} 
                onSave={updateLegalContent} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
