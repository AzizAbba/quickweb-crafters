
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { services, addOrder } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [details, setDetails] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedServiceData, setSelectedServiceData] = useState(services[0] || null);

  useEffect(() => {
    // If there's a type parameter, find the matching service
    if (type) {
      const serviceByType = services.find(service => 
        service.type.toLowerCase() === type.toLowerCase()
      );
      
      if (serviceByType) {
        setSelectedService(serviceByType.id);
        setSelectedServiceData(serviceByType);
      }
    }
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [type, services]);

  // Update selected service data when selection changes
  useEffect(() => {
    if (selectedService) {
      const service = services.find(s => s.id === selectedService);
      if (service) {
        setSelectedServiceData(service);
      }
    }
  }, [selectedService, services]);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    const service = services.find(s => s.id === value);
    if (service) {
      setSelectedServiceData(service);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place an order.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    if (!selectedService || !businessType || !details) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Get selected service data
      const service = services.find(s => s.id === selectedService);
      if (!service) {
        throw new Error("Invalid service selected");
      }
      
      // Prepare order object
      const newOrder = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        serviceType: service.title,
        status: "pending" as const,
        details,
        businessType,
        requirements,
        price: service.price
      };
      
      // Add the order
      await addOrder(newOrder);
      
      // Show success message
      setSuccessMessage("Order submitted successfully!");
      
      // Reset form
      setBusinessType("");
      setDetails("");
      setRequirements("");
      
      // Redirect after delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Error Submitting Order",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {successMessage ? (
          <section className="py-24 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold mb-4">{successMessage}</h1>
              <p className="text-xl text-gray-600 mb-8">Thank you for your order! We'll be in touch soon.</p>
              <Button onClick={() => navigate("/")} size="lg">Return to Homepage</Button>
            </div>
          </section>
        ) : (
          <>
            <section className="bg-brand-blue text-white py-16 md:py-24">
              <div className="container mx-auto px-4 max-w-7xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Order a Website</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Tell us about your project, and we'll create the perfect website for you.
                </p>
              </div>
            </section>
            
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Order Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Type</Label>
                        <Select value={selectedService || ""} onValueChange={handleServiceChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business/Project Type</Label>
                        <Select value={businessType} onValueChange={setBusinessType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small Business">Small Business</SelectItem>
                            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                            <SelectItem value="Personal Website">Personal Website</SelectItem>
                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                            <SelectItem value="Blog">Blog</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="details">Project Details</Label>
                        <Textarea 
                          id="details"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Describe your project and what you need"
                          rows={5}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="requirements">Specific Requirements (Optional)</Label>
                        <Textarea 
                          id="requirements"
                          value={requirements}
                          onChange={(e) => setRequirements(e.target.value)}
                          placeholder="Any specific features or requirements you need"
                          rows={3}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Place Order"}
                      </Button>
                    </form>
                  </div>
                  
                  <div>
                    {selectedServiceData ? (
                      <Card className="border-2 border-brand-blue/20">
                        <CardHeader>
                          <CardTitle className="text-2xl">{selectedServiceData.title}</CardTitle>
                          <CardDescription className="text-base">{selectedServiceData.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h3 className="font-semibold text-lg mb-2">Includes:</h3>
                            <ul className="space-y-2">
                              {selectedServiceData.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                            <div>
                              <h3 className="font-semibold text-lg">Price</h3>
                              <p className="text-2xl font-bold text-brand-blue">{selectedServiceData.price}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Delivery Time</h3>
                              <p className="text-lg">{selectedServiceData.deliveryTime}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t">
                          <div className="w-full">
                            <p className="text-sm text-gray-500 mb-1">
                              After ordering, our team will contact you to discuss your project in detail.
                            </p>
                          </div>
                        </CardFooter>
                      </Card>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12">
                        <p className="text-gray-500 text-center">
                          Select a service to see details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default OrderPage;
