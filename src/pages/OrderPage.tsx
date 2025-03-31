import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ArrowRight, Clock, Calendar } from "lucide-react";

const OrderPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services, addOrder } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    businessType: "Small Business",
    details: "",
    requirements: "",
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        setStep(2);
      }
    }
  }, [serviceId, services]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      toast({
        title: "Error",
        description: "Please select a service",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addOrder({
        userId: user?.id || "guest",
        userName: formData.name,
        userEmail: formData.email,
        serviceType: selectedService.title,
        status: "pending",
        details: formData.details,
        businessType: formData.businessType,
        requirements: formData.requirements,
      });
      
      setStep(3);
      
      toast({
        title: "Order Submitted",
        description: "Our team will contact you shortly via email to discuss your project and payment options.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStep(2);
  };

  const businessTypes = [
    "Small Business",
    "Standard Website", // Added standard website as requested
    "Corporate",
    "E-commerce",
    "Portfolio",
    "Blog",
    "Non-profit",
    "Educational"
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="relative">
              <div className="flex justify-between items-center mb-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-brand-blue text-white" : "bg-gray-200"} z-10`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <div className={`h-1 absolute top-5 left-10 right-1/2 -translate-x-5 ${step >= 2 ? "bg-brand-blue" : "bg-gray-200"}`}></div>
                <div className={`h-1 absolute top-5 left-1/2 right-10 translate-x-5 ${step >= 3 ? "bg-brand-blue" : "bg-gray-200"}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-brand-blue text-white" : "bg-gray-200"} z-10`}>
                  {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-brand-blue text-white" : "bg-gray-200"} z-10`}>
                  {step > 3 ? <Check className="h-5 w-5" /> : "3"}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div className={`w-20 text-center ${step >= 1 ? "text-brand-blue font-medium" : "text-gray-500"}`}>Select Service</div>
                <div className={`w-20 text-center ${step >= 2 ? "text-brand-blue font-medium" : "text-gray-500"}`}>Project Details</div>
                <div className={`w-20 text-center ${step >= 3 ? "text-brand-blue font-medium" : "text-gray-500"}`}>Confirmation</div>
              </div>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-center mt-8">
              {step === 1 && "Select Your Service"}
              {step === 2 && "Project Details"}
              {step === 3 && "Order Confirmation"}
            </h2>
            {step === 1 && (
              <p className="text-center text-gray-600 mt-2">Choose the service that best fits your needs</p>
            )}
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService?.id === service.id ? "ring-2 ring-brand-blue" : ""
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  {service.imageUrl && (
                    <div className="h-40 w-full overflow-hidden">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Delivery: {service.deliveryTime}</span>
                    </div>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-brand-blue">+ {service.features.length - 3} more features</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-bold text-brand-blue">Free</span>
                    <Button size="sm">Select</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Order Details for {selectedService?.title}</CardTitle>
                <CardDescription>Please provide the details for your project</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business/Project Type</Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange as any}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Describe your project needs and expectations in detail"
                      rows={4}
                      value={formData.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Specific Requirements</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      placeholder="Any specific features, design requirements, technology preferences, etc."
                      rows={3}
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <span>Service:</span>
                      <span className="font-medium">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Price:</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span className="font-medium">{selectedService?.deliveryTime}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      Our team will contact you to discuss payment options after reviewing your project requirements.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Complete Order"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Order Submitted Successfully!</CardTitle>
                <CardDescription className="text-lg">Thank you for your order</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6 text-lg">
                  Our team will contact you shortly via email to discuss your project requirements and payment options.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto border">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Order Reference:</span>
                    <span className="font-medium">{`ORD-${Date.now().toString().slice(-6)}`}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Service:</span>
                    <span>{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Business Type:</span>
                    <span>{formData.businessType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Expected Contact:</span>
                    <span className="flex items-center text-brand-blue">
                      <Calendar className="h-4 w-4 mr-1" /> Within 24 hours
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => navigate("/")}>Return to Home</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderPage;
