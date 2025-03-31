
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
import { ServiceType } from "@/context/DataContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const ServiceEditor = () => {
  const { services, updateService } = useData();
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const handleSelectService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setEditingService(JSON.parse(JSON.stringify(service)));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingService) return;
    
    const { name, value } = e.target;
    setEditingService({
      ...editingService,
      [name]: value
    });
  };
  
  const handleTypeChange = (value: string) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      type: value as ServiceType["type"]
    });
  };

  const handleAddFeature = () => {
    if (!editingService || !newFeature.trim()) return;
    
    setEditingService({
      ...editingService,
      features: [...editingService.features, newFeature.trim()]
    });
    
    setNewFeature("");
  };
  
  const handleRemoveFeature = (index: number) => {
    if (!editingService) return;
    
    const updatedFeatures = [...editingService.features];
    updatedFeatures.splice(index, 1);
    
    setEditingService({
      ...editingService,
      features: updatedFeatures
    });
  };

  const handleSaveService = () => {
    if (!editingService) return;
    
    updateService(editingService);
    
    toast({
      title: "Service Updated",
      description: `${editingService.title} has been updated successfully.`,
    });
    
    setEditingService(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Management</CardTitle>
        <CardDescription>
          Edit your service offerings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!editingService ? (
            <>
              <Label htmlFor="serviceSelect">Select a service to edit</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map(service => (
                  <Card key={service.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleSelectService(service.id)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription className="text-xs">{service.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Basic Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input id="title" name="title" value={editingService.title} onChange={handleChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={editingService.type} onValueChange={handleTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" value={editingService.price} onChange={handleChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime">Delivery Time</Label>
                    <Input id="deliveryTime" name="deliveryTime" value={editingService.deliveryTime} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={editingService.description} 
                    onChange={handleChange} 
                    rows={3}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {editingService.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={feature} disabled />
                        <Button 
                          type="button" 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add new feature" 
                      value={newFeature} 
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      {editingService && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setEditingService(null)}>
            Cancel
          </Button>
          <Button onClick={handleSaveService}>
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ServiceEditor;
