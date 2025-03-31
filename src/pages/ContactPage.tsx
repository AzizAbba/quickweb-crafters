
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const { user } = useAuth();
  const { services, addOrder } = useData();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [orderData, setOrderData] = useState({
    details: "",
    businessType: "Small Business",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleBusinessTypeChange = (value: string) => {
    setOrderData((prev) => ({
      ...prev,
      businessType: value,
    }));
  };
  
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to place an order.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedService) {
      toast({
        title: "Select a Service",
        description: "Please select a service before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit order with enhanced details
    setTimeout(() => {
      addOrder({
        userId: user.id,
        userName: user.username,
        userEmail: user.email,
        serviceType: selectedService,
        status: "pending",
        details: orderData.details,
        businessType: orderData.businessType,
        requirements: orderData.requirements,
      });
      
      toast({
        title: "Order Submitted",
        description: "Your order has been submitted successfully!",
      });
      
      setSelectedService(null);
      setOrderData({
        details: "",
        businessType: "Small Business",
        requirements: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions or ready to start your project? Contact us today for a free consultation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                  Alternatively, you can reach us directly using the information below.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email</h3>
                      <a href="mailto:azizabboud00@gmail.com" className="text-brand-blue hover:underline">azizabboud00@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Office</h3>
                      <p className="text-gray-600">Remote Team - Available Worldwide</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Place an Order</h2>
                
                {user ? (
                  <Card className="p-6">
                    <Tabs defaultValue="service" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="service">Select Service</TabsTrigger>
                        <TabsTrigger value="details" disabled={!selectedService}>Project Details</TabsTrigger>
                        <TabsTrigger value="review" disabled={!selectedService || !orderData.details}>Review</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="service">
                        <div className="py-4">
                          <p className="text-gray-600 mb-4">Select the service that best fits your needs:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {services.map((service) => (
                              <div
                                key={service.id}
                                className={`border rounded-md p-4 cursor-pointer ${
                                  selectedService === service.title
                                    ? "border-brand-blue bg-brand-blue/5"
                                    : "border-gray-200 hover:border-brand-blue/50"
                                }`}
                                onClick={() => setSelectedService(service.title)}
                              >
                                <div className="font-medium mb-1">{service.title}</div>
                                <div className="text-sm text-gray-500 mb-2">{service.price}</div>
                                <div className="text-xs text-gray-500">Delivery: {service.deliveryTime}</div>
                              </div>
                            ))}
                          </div>
                          
                          {selectedService && (
                            <div className="mt-6 flex justify-end">
                              <TabsTrigger asChild value="details">
                                <Button>Continue to Project Details</Button>
                              </TabsTrigger>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details">
                        <form className="py-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessType">Project Type</Label>
                            <Select value={orderData.businessType} onValueChange={handleBusinessTypeChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Small Business">Small Business</SelectItem>
                                <SelectItem value="Corporate">Corporate</SelectItem>
                                <SelectItem value="Personal Portfolio">Personal Portfolio</SelectItem>
                                <SelectItem value="Blog">Blog</SelectItem>
                                <SelectItem value="E-commerce">E-commerce</SelectItem>
                                <SelectItem value="Non-profit">Non-profit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="details">Project Overview</Label>
                            <Textarea
                              id="details"
                              name="details"
                              rows={3}
                              placeholder="Describe your project in general terms..."
                              value={orderData.details}
                              onChange={handleOrderDataChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="requirements">Specific Requirements</Label>
                            <Textarea
                              id="requirements"
                              name="requirements"
                              rows={4}
                              placeholder="List any specific features, design preferences, or technical requirements..."
                              value={orderData.requirements}
                              onChange={handleOrderDataChange}
                            />
                          </div>
                          
                          <div className="flex justify-between mt-6">
                            <TabsTrigger asChild value="service">
                              <Button variant="outline">Back to Services</Button>
                            </TabsTrigger>
                            
                            <TabsTrigger asChild value="review" disabled={!orderData.details}>
                              <Button>Review Order</Button>
                            </TabsTrigger>
                          </div>
                        </form>
                      </TabsContent>
                      
                      <TabsContent value="review">
                        <div className="py-4 space-y-6">
                          <div>
                            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6">
                              <div className="bg-gray-50 p-4 rounded-md">
                                <div className="text-sm text-gray-500 mb-1">Service</div>
                                <div className="font-medium">{selectedService}</div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-md">
                                <div className="text-sm text-gray-500 mb-1">Project Type</div>
                                <div>{orderData.businessType}</div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-md">
                                <div className="text-sm text-gray-500 mb-1">Project Overview</div>
                                <p className="text-gray-800">{orderData.details}</p>
                              </div>
                              
                              {orderData.requirements && (
                                <div className="bg-gray-50 p-4 rounded-md">
                                  <div className="text-sm text-gray-500 mb-1">Specific Requirements</div>
                                  <p className="text-gray-800">{orderData.requirements}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <TabsTrigger asChild value="details">
                              <Button variant="outline">Edit Details</Button>
                            </TabsTrigger>
                            
                            <Button onClick={handleOrderSubmit} disabled={isSubmitting}>
                              {isSubmitting ? "Processing..." : "Submit Order"}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="mb-4">Please sign in to place an order.</p>
                    <Button asChild>
                      <a href="/signin">Sign In</a>
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map/Location Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We Work Globally</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Our team serves clients worldwide, providing high-quality web development services regardless of location.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 max-w-5xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 h-[400px] flex items-center justify-center">
                <svg className="h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2.5M10 11v9m-4 0h8m-8 0v-3.5A2.5 2.5 0 018.5 14h7a2.5 2.5 0 012.5 2.5v3.5m0 0h-8M3 16V8a2 2 0 012-2h6m0 0h4.5a2.5 2.5 0 110 5H11m0-5V3"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
