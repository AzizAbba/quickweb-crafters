
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploader from "@/components/admin/ImageUploader";
import { FileText, Image, Home, Phone, Info, ShoppingBag, DollarSign } from "lucide-react";

interface PageData {
  [key: string]: any;
}

const PageEditor = () => {
  const { siteContent, updateSiteContent } = useData();
  const { toast } = useToast();
  const [content, setContent] = useState<PageData>(siteContent);
  const [activeTab, setActiveTab] = useState("home");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateSiteContent(content);
    
    toast({
      title: "Page Content Updated",
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page content has been updated successfully.`,
    });
  };

  const handleImageUpload = (field: string, image: string) => {
    setContent(prev => ({
      ...prev,
      [field]: image
    }));
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-brand-blue/5">
        <CardTitle>Page Content Editor</CardTitle>
        <CardDescription>
          Customize the content of your website's pages
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="pt-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input 
                  id="heroTitle" 
                  name="heroTitle" 
                  value={content.heroTitle || ""} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea 
                  id="heroSubtitle" 
                  name="heroSubtitle" 
                  value={content.heroSubtitle || ""} 
                  onChange={handleChange}
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
                <Label htmlFor="aboutContent">About Section Content</Label>
                <Textarea 
                  id="aboutContent" 
                  name="aboutContent" 
                  value={content.aboutContent || ""} 
                  onChange={handleChange}
                  rows={4} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeCtaText">Call to Action Text</Label>
                <Input 
                  id="homeCtaText" 
                  name="homeCtaText" 
                  value={content.homeCtaText || "Get Started Today"} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="pt-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="servicesTitle">Page Title</Label>
                <Input 
                  id="servicesTitle" 
                  name="servicesTitle" 
                  value={content.servicesTitle || "Our Services"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="servicesSubtitle">Page Subtitle</Label>
                <Textarea 
                  id="servicesSubtitle" 
                  name="servicesSubtitle" 
                  value={content.servicesSubtitle || "We offer a wide range of web development services to meet your needs"} 
                  onChange={handleChange}
                  rows={2} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="servicesDescription">Services Description</Label>
                <Textarea 
                  id="servicesDescription" 
                  name="servicesDescription" 
                  value={content.servicesDescription || "Each service is tailored to meet the unique needs of your business, ensuring that you get exactly what you need to succeed online."} 
                  onChange={handleChange}
                  rows={3} 
                />
              </div>
              
              <p className="text-sm text-gray-500">
                Note: To edit individual services, use the Services Management section.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="pt-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pricingTitle">Page Title</Label>
                <Input 
                  id="pricingTitle" 
                  name="pricingTitle" 
                  value={content.pricingTitle || "Our Pricing"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricingSubtitle">Page Subtitle</Label>
                <Textarea 
                  id="pricingSubtitle" 
                  name="pricingSubtitle" 
                  value={content.pricingSubtitle || "Affordable website solutions for every budget"} 
                  onChange={handleChange}
                  rows={2} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricingDescription">Pricing Description</Label>
                <Textarea 
                  id="pricingDescription" 
                  name="pricingDescription" 
                  value={content.pricingDescription || "Our pricing is transparent with no hidden fees. Choose the plan that fits your needs and budget."} 
                  onChange={handleChange}
                  rows={3} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricingFaq">Pricing FAQ</Label>
                <Textarea 
                  id="pricingFaq" 
                  name="pricingFaq" 
                  value={content.pricingFaq || "We offer flexible payment options and customized solutions. Contact us for more details."} 
                  onChange={handleChange}
                  rows={3} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="pt-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Page Title</Label>
                <Input 
                  id="aboutTitle" 
                  name="aboutTitle" 
                  value={content.aboutTitle || "About Us"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aboutSubtitle">Page Subtitle</Label>
                <Textarea 
                  id="aboutSubtitle" 
                  name="aboutSubtitle" 
                  value={content.aboutSubtitle || "Learn more about our team and our mission"} 
                  onChange={handleChange}
                  rows={2} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Team Image</Label>
                <ImageUploader 
                  currentImage={content.teamImage}
                  onImageUpload={(image) => handleImageUpload('teamImage', image)}
                />
              </div>
              
              <p className="text-sm text-gray-500">
                Note: To edit the team members and detailed about content, use the About Content section.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="pt-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contactTitle">Page Title</Label>
                <Input 
                  id="contactTitle" 
                  name="contactTitle" 
                  value={content.contactTitle || "Contact Us"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactSubtitle">Page Subtitle</Label>
                <Textarea 
                  id="contactSubtitle" 
                  name="contactSubtitle" 
                  value={content.contactSubtitle || "Get in touch with our team"} 
                  onChange={handleChange}
                  rows={2} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input 
                  id="contactEmail" 
                  name="contactEmail" 
                  value={content.contactEmail || "contact@quickweb.com"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone" 
                  value={content.contactPhone || "+1 (555) 123-4567"} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactAddress">Office Address</Label>
                <Textarea 
                  id="contactAddress" 
                  name="contactAddress" 
                  value={content.contactAddress || "Remote Team - Available Worldwide"} 
                  onChange={handleChange}
                  rows={2} 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={handleSave} className="mt-6 w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default PageEditor;
