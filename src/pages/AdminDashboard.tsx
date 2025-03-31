
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { orders, siteContent, updateSiteContent, updateOrderStatus, services, messages } = useData();
  
  const [content, setContent] = useState(siteContent);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
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
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="content">Website Content</TabsTrigger>
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

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                  <CardDescription>
                    Update the content displayed on your website
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
                      <Label htmlFor="aboutContent">About Content</Label>
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
