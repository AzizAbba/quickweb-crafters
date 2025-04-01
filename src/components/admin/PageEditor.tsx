
import { useState, useEffect } from "react";
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
import { FileText, Image, Home, Phone, Info, ShoppingBag, DollarSign, Plus, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PageData {
  [key: string]: any;
}

interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'content' | 'cta' | 'features' | 'testimonials' | 'image' | 'contact';
  image?: string;
  order: number;
}

const PageEditor = () => {
  const { siteContent, updateSiteContent } = useData();
  const { toast } = useToast();
  const [content, setContent] = useState<PageData>(siteContent);
  const [activeTab, setActiveTab] = useState("home");
  const [editingSections, setEditingSections] = useState<{[key: string]: PageSection[]}>({
    home: siteContent.homeSections || [],
    about: siteContent.aboutSections || [],
    contact: siteContent.contactSections || []
  });
  const [isAddingSectionDialogOpen, setIsAddingSectionDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState<Omit<PageSection, 'id' | 'order'>>({
    title: '',
    content: '',
    type: 'content',
    image: ''
  });
  const [currentEditingPage, setCurrentEditingPage] = useState('');
  const [isDeletingSectionDialogOpen, setIsDeletingSectionDialogOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  // Update local state when context changes
  useEffect(() => {
    setContent(siteContent);
    setEditingSections({
      home: siteContent.homeSections || [],
      about: siteContent.aboutSections || [],
      contact: siteContent.contactSections || []
    });
  }, [siteContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedContent = {
      ...content,
      homeSections: editingSections.home,
      aboutSections: editingSections.about,
      contactSections: editingSections.contact
    };
    updateSiteContent(updatedContent);
    
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

  const openAddSectionDialog = (pageType: string) => {
    setCurrentEditingPage(pageType);
    setNewSection({
      title: '',
      content: '',
      type: 'content',
      image: ''
    });
    setIsAddingSectionDialogOpen(true);
  };

  const handleNewSectionChange = (field: string, value: string) => {
    setNewSection(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSection = () => {
    if (!newSection.title.trim()) {
      toast({
        title: "Error",
        description: "Please provide a title for the section",
        variant: "destructive"
      });
      return;
    }

    const newSectionComplete: PageSection = {
      ...newSection,
      id: `section_${Date.now()}`,
      order: editingSections[currentEditingPage].length
    };

    setEditingSections(prev => ({
      ...prev,
      [currentEditingPage]: [...prev[currentEditingPage], newSectionComplete]
    }));

    setIsAddingSectionDialogOpen(false);
    
    toast({
      title: "Section Added",
      description: `New section "${newSection.title}" has been added to the ${currentEditingPage} page.`,
    });
  };

  const handleDeleteSection = (pageType: string, sectionId: string) => {
    setSectionToDelete(sectionId);
    setCurrentEditingPage(pageType);
    setIsDeletingSectionDialogOpen(true);
  };

  const confirmDeleteSection = () => {
    if (!sectionToDelete) return;
    
    setEditingSections(prev => ({
      ...prev,
      [currentEditingPage]: prev[currentEditingPage].filter(section => section.id !== sectionToDelete)
    }));

    setIsDeletingSectionDialogOpen(false);
    setSectionToDelete(null);
    
    toast({
      title: "Section Deleted",
      description: `The section has been removed from the ${currentEditingPage} page.`,
    });
  };

  const handleUpdateSection = (pageType: string, sectionId: string, field: string, value: string) => {
    setEditingSections(prev => ({
      ...prev,
      [pageType]: prev[pageType].map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSectionImageUpload = (pageType: string, sectionId: string, image: string) => {
    setEditingSections(prev => ({
      ...prev,
      [pageType]: prev[pageType].map(section => 
        section.id === sectionId ? { ...section, image } : section
      )
    }));
  };

  return (
    <>
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
                
                <div className="border-t pt-6 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Custom Page Sections</h3>
                    <Button onClick={() => openAddSectionDialog('home')} variant="outline" size="sm" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add Section
                    </Button>
                  </div>
                  
                  {editingSections.home.length > 0 ? (
                    <div className="space-y-6">
                      {editingSections.home.map((section) => (
                        <Card key={section.id} className="border border-gray-200">
                          <CardHeader className="bg-gray-50 pb-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <CardTitle className="text-base">{section.title}</CardTitle>
                                <CardDescription>{section.type}</CardDescription>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteSection('home', section.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label>Section Title</Label>
                              <Input 
                                value={section.title} 
                                onChange={(e) => handleUpdateSection('home', section.id, 'title', e.target.value)} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Content</Label>
                              <Textarea 
                                value={section.content} 
                                onChange={(e) => handleUpdateSection('home', section.id, 'content', e.target.value)}
                                rows={3}
                              />
                            </div>
                            
                            {(section.type === 'hero' || section.type === 'image' || section.type === 'content') && (
                              <div className="space-y-2">
                                <Label>Section Image</Label>
                                <ImageUploader 
                                  currentImage={section.image || ''}
                                  onImageUpload={(image) => handleSectionImageUpload('home', section.id, image)}
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <h4 className="text-gray-500 mb-2">No custom sections yet</h4>
                      <Button onClick={() => openAddSectionDialog('home')} variant="secondary" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Your First Section
                      </Button>
                    </div>
                  )}
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
                
                <div className="border-t pt-6 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Custom About Page Sections</h3>
                    <Button onClick={() => openAddSectionDialog('about')} variant="outline" size="sm" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add Section
                    </Button>
                  </div>
                  
                  {editingSections.about.length > 0 ? (
                    <div className="space-y-6">
                      {editingSections.about.map((section) => (
                        <Card key={section.id} className="border border-gray-200">
                          <CardHeader className="bg-gray-50 pb-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <CardTitle className="text-base">{section.title}</CardTitle>
                                <CardDescription>{section.type}</CardDescription>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteSection('about', section.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label>Section Title</Label>
                              <Input 
                                value={section.title} 
                                onChange={(e) => handleUpdateSection('about', section.id, 'title', e.target.value)} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Content</Label>
                              <Textarea 
                                value={section.content} 
                                onChange={(e) => handleUpdateSection('about', section.id, 'content', e.target.value)}
                                rows={3}
                              />
                            </div>
                            
                            {(section.type === 'hero' || section.type === 'image' || section.type === 'content') && (
                              <div className="space-y-2">
                                <Label>Section Image</Label>
                                <ImageUploader 
                                  currentImage={section.image || ''}
                                  onImageUpload={(image) => handleSectionImageUpload('about', section.id, image)}
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <h4 className="text-gray-500 mb-2">No custom sections yet</h4>
                      <Button onClick={() => openAddSectionDialog('about')} variant="secondary" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Your First Section
                      </Button>
                    </div>
                  )}
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
                
                <div className="space-y-2">
                  <Label htmlFor="globalTeamImage">Global Team Image</Label>
                  <ImageUploader 
                    currentImage={content.globalTeamImage || "/lovable-uploads/311de303-225c-477a-8fc9-d42f4a91a1f1.png"}
                    onImageUpload={(image) => handleImageUpload('globalTeamImage', image)}
                  />
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Custom Contact Page Sections</h3>
                    <Button onClick={() => openAddSectionDialog('contact')} variant="outline" size="sm" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add Section
                    </Button>
                  </div>
                  
                  {editingSections.contact.length > 0 ? (
                    <div className="space-y-6">
                      {editingSections.contact.map((section) => (
                        <Card key={section.id} className="border border-gray-200">
                          <CardHeader className="bg-gray-50 pb-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <CardTitle className="text-base">{section.title}</CardTitle>
                                <CardDescription>{section.type}</CardDescription>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteSection('contact', section.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label>Section Title</Label>
                              <Input 
                                value={section.title} 
                                onChange={(e) => handleUpdateSection('contact', section.id, 'title', e.target.value)} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Content</Label>
                              <Textarea 
                                value={section.content} 
                                onChange={(e) => handleUpdateSection('contact', section.id, 'content', e.target.value)}
                                rows={3}
                              />
                            </div>
                            
                            {(section.type === 'hero' || section.type === 'image' || section.type === 'content') && (
                              <div className="space-y-2">
                                <Label>Section Image</Label>
                                <ImageUploader 
                                  currentImage={section.image || ''}
                                  onImageUpload={(image) => handleSectionImageUpload('contact', section.id, image)}
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <h4 className="text-gray-500 mb-2">No custom sections yet</h4>
                      <Button onClick={() => openAddSectionDialog('contact')} variant="secondary" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Your First Section
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button onClick={handleSave} className="mt-6 w-full">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Add Section Dialog */}
      <AlertDialog open={isAddingSectionDialogOpen} onOpenChange={setIsAddingSectionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Section</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new section for your page. Choose the type of section you want to add.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input 
                id="sectionTitle"
                value={newSection.title}
                onChange={(e) => handleNewSectionChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sectionType">Section Type</Label>
              <select 
                id="sectionType"
                value={newSection.type}
                onChange={(e) => handleNewSectionChange('type', e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="hero">Hero Section</option>
                <option value="content">Content Section</option>
                <option value="features">Features Section</option>
                <option value="cta">Call to Action</option>
                <option value="testimonials">Testimonials</option>
                <option value="image">Image Section</option>
                <option value="contact">Contact Section</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sectionContent">Content</Label>
              <Textarea 
                id="sectionContent"
                value={newSection.content}
                onChange={(e) => handleNewSectionChange('content', e.target.value)}
                placeholder="Enter section content"
                rows={4}
              />
            </div>
            
            {(newSection.type === 'hero' || newSection.type === 'image' || newSection.type === 'content') && (
              <div className="space-y-2">
                <Label>Section Image (Optional)</Label>
                <ImageUploader 
                  currentImage={newSection.image || ''}
                  onImageUpload={(image) => handleNewSectionChange('image', image)}
                />
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddSection}>Add Section</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Section Confirmation Dialog */}
      <AlertDialog open={isDeletingSectionDialogOpen} onOpenChange={setIsDeletingSectionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Section</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this section? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSection} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PageEditor;
