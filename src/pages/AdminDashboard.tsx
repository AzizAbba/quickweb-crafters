
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { TeamMemberType } from "@/context/DataContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { orders, siteContent, aboutContent, updateSiteContent, updateAboutContent, updateOrderStatus, services, messages } = useData();
  
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

  if (!user || user.role !== "admin") {
    return null; // Don't render anything if not admin
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage website content, orders, users and messages</p>
          </div>

          <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-6 md:inline-flex">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

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
                                <p className="text-gray-500 text-sm">
                                  Order ID: {order.id}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Date: {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <div className="mt-4">
                                  <h4 className="font-medium text-sm mb-1">Customer</h4>
                                  <p>{order.userName}</p>
                                  <p className="text-gray-500 text-sm">{order.userEmail}</p>
                                </div>
                                {order.businessType && (
                                  <div className="mt-2">
                                    <h4 className="font-medium text-sm mb-1">Project Type</h4>
                                    <p>{order.businessType}</p>
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="mb-4">
                                  <h4 className="font-medium text-sm mb-1">Details</h4>
                                  <p className="text-gray-600">{order.details}</p>
                                </div>
                                {order.requirements && (
                                  <div className="mb-4">
                                    <h4 className="font-medium text-sm mb-1">Requirements</h4>
                                    <p className="text-gray-600">{order.requirements}</p>
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
                                    <SelectTrigger>
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

            {/* Home Content Tab */}
            <TabsContent value="home">
              <Card>
                <CardHeader>
                  <CardTitle>Home Page Content</CardTitle>
                  <CardDescription>
                    Update the content displayed on your home page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input 
                        id="heroTitle" 
                        name="heroTitle" 
                        value={content.heroTitle} 
                        onChange={handleContentChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Textarea 
                        id="heroSubtitle" 
                        name="heroSubtitle" 
                        value={content.heroSubtitle} 
                        onChange={handleContentChange}
                        rows={2} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aboutContent">About Content (Home Page)</Label>
                      <Textarea 
                        id="aboutContent" 
                        name="aboutContent" 
                        value={content.aboutContent} 
                        onChange={handleContentChange}
                        rows={4} 
                      />
                    </div>

                    <Button onClick={handleContentSave}>
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                                  <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-12 h-12 rounded-full object-cover" 
                                  />
                                  <div>
                                    <h4 className="font-semibold">{member.name}</h4>
                                    <p className="text-sm text-gray-500">{member.role}</p>
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
                              <Label htmlFor="memberImage">Image URL</Label>
                              <Input 
                                id="memberImage" 
                                name="image" 
                                value={newTeamMember.image} 
                                onChange={handleTeamMemberChange} 
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

                    <Button onClick={handleAboutSave}>
                      Save All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services">
              <ServiceEditor />
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <UsersTable />
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent value="messages">
              <MessagesList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
