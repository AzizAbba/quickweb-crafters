
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
import { Check, ArrowRight } from "lucide-react";

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
    businessType: "",
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
        description: "Our team will contact you shortly via email.",
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-center items-center mb-6">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-brand-blue text-white" : "bg-gray-200"} mr-2`}>
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? "bg-brand-blue" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-brand-blue text-white" : "bg-gray-200"} mr-2`}>
                {step > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? "bg-brand-blue" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-brand-blue text-white" : "bg-gray-200"}`}>
                {step > 3 ? <Check className="h-4 w-4" /> : "3"}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">
              {step === 1 && "Select Your Service"}
              {step === 2 && "Project Details"}
              {step === 3 && "Order Confirmation"}
            </h2>
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
                  <CardHeader className="pb-2">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-bold text-brand-blue">{service.price}</span>
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
                    <Input
                      id="businessType"
                      name="businessType"
                      placeholder="E.g., E-commerce, Portfolio, Blog, etc."
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Describe your project needs and expectations"
                      rows={4}
                      value={formData.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Specific Requirements (Optional)</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      placeholder="Any specific features, design requirements, etc."
                      rows={3}
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Service:</span>
                      <span className="font-medium">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span className="font-medium">{selectedService?.deliveryTime}</span>
                    </div>
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
                <CardDescription>Thank you for your order</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  Our team will contact you shortly via email to discuss your project requirements and payment options.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                  <div className="flex justify-between mb-2">
                    <span>Order Reference:</span>
                    <span className="font-medium">{`ORD-${Date.now().toString().slice(-6)}`}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Contact:</span>
                    <span className="font-medium">Within 24 hours</span>
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
