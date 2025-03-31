
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
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Calendar, Mail, Phone, Info, User } from "lucide-react";
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
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage website content, orders, users and messages</p>
          </div>

          <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-8 md:inline-flex">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
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
                      <Label>Hero Image</Label>
                      <ImageUploader 
                        currentImage={content.heroImage}
                        onImageUpload={(image) => handleImageUpload('heroImage', image)}
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
              
              <div className="mt-6">
                <FooterSocialEditor 
                  initialSocialLinks={footerLinks} 
                  onSave={updateFooterLinks} 
                />
              </div>
              
              <div className="mt-6">
                <LegalEditor 
                  initialContent={legalContent} 
                  onSave={updateLegalContent} 
                />
              </div>
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
            
            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Page Content</CardTitle>
                  <CardDescription>
                    Update the content displayed on your pricing page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="pricingTitle">Page Title</Label>
                      <Input 
                        id="pricingTitle" 
                        name="pricingTitle" 
                        value={content.pricingTitle || "Affordable Website Solutions"} 
                        onChange={handleContentChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pricingSubtitle">Page Subtitle</Label>
                      <Textarea 
                        id="pricingSubtitle" 
                        name="pricingSubtitle" 
                        value={content.pricingSubtitle || "Choose a plan that fits your needs"} 
                        onChange={handleContentChange}
                        rows={2} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pricingDescription">Description</Label>
                      <Textarea 
                        id="pricingDescription" 
                        name="pricingDescription" 
                        value={content.pricingDescription || "All plans include hosting, domain registration, and ongoing support"} 
                        onChange={handleContentChange}
                        rows={3} 
                      />
                    </div>

                    <p className="text-sm text-gray-500">
                      Note: To manage pricing plans and features, please use the Services tab.
                    </p>

                    <Button onClick={handleContentSave}>
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Page Content</CardTitle>
                  <CardDescription>
                    Update the content displayed on your contact page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactTitle">Page Title</Label>
                      <Input 
                        id="contactTitle" 
                        name="contactTitle" 
                        value={content.contactTitle || "Get in Touch"} 
                        onChange={handleContentChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactSubtitle">Page Subtitle</Label>
                      <Textarea 
                        id="contactSubtitle" 
                        name="contactSubtitle" 
                        value={content.contactSubtitle || "Have questions or ready to start your project? Contact us today for a free consultation."} 
                        onChange={handleContentChange}
                        rows={2} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Contact Information</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Email Address</Label>
                          <Input 
                            id="contactEmail" 
                            name="contactEmail" 
                            value={content.contactEmail || "azizabboud00@gmail.com"} 
                            onChange={handleContentChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Phone</Label>
                          <Input 
                            id="contactPhone" 
                            name="contactPhone" 
                            value={content.contactPhone || ""} 
                            onChange={handleContentChange} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactAddress">Office Address</Label>
                      <Textarea 
                        id="contactAddress" 
                        name="contactAddress" 
                        value={content.contactAddress || "Remote Team - Available Worldwide"} 
                        onChange={handleContentChange}
                        rows={2} 
                      />
                    </div>

                    <Button onClick={handleContentSave}>
                      Save Changes
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
