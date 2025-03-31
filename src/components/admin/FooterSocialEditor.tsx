
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, BrandTiktok } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  enabled: boolean;
  icon: React.ReactNode;
}

interface FooterSocialEditorProps {
  initialSocialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  onSave: (links: any) => void;
}

const FooterSocialEditor = ({ initialSocialLinks = {}, onSave }: FooterSocialEditorProps) => {
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { 
      name: "facebook", 
      url: initialSocialLinks.facebook || "", 
      enabled: !!initialSocialLinks.facebook,
      icon: <Facebook className="h-5 w-5" />
    },
    { 
      name: "instagram", 
      url: initialSocialLinks.instagram || "", 
      enabled: !!initialSocialLinks.instagram,
      icon: <Instagram className="h-5 w-5" />
    },
    { 
      name: "twitter", 
      url: initialSocialLinks.twitter || "", 
      enabled: !!initialSocialLinks.twitter,
      icon: <Twitter className="h-5 w-5" />
    },
    { 
      name: "linkedin", 
      url: initialSocialLinks.linkedin || "", 
      enabled: !!initialSocialLinks.linkedin,
      icon: <Linkedin className="h-5 w-5" />
    },
    { 
      name: "youtube", 
      url: initialSocialLinks.youtube || "", 
      enabled: !!initialSocialLinks.youtube,
      icon: <Youtube className="h-5 w-5" />
    },
    { 
      name: "tiktok", 
      url: initialSocialLinks.tiktok || "", 
      enabled: !!initialSocialLinks.tiktok,
      icon: <BrandTiktok className="h-5 w-5" />
    }
  ]);

  const handleUrlChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index].url = value;
    setSocialLinks(updated);
  };

  const handleToggleChange = (index: number, checked: boolean) => {
    const updated = [...socialLinks];
    updated[index].enabled = checked;
    setSocialLinks(updated);
  };

  const handleSaveLinks = () => {
    const socialObj = socialLinks.reduce((acc, link) => {
      if (link.enabled && link.url.trim()) {
        acc[link.name] = link.url.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    onSave(socialObj);
    
    toast({
      title: "Social Links Updated",
      description: "Footer social media links have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Switch 
                checked={link.enabled} 
                onCheckedChange={(checked) => handleToggleChange(index, checked)} 
                id={`enable-${link.name}`}
              />
              <div className="flex items-center space-x-2 w-28">
                <div className="text-gray-500">
                  {link.icon}
                </div>
                <Label htmlFor={`${link.name}-url`} className="capitalize">{link.name}</Label>
              </div>
              <Input
                id={`${link.name}-url`}
                value={link.url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder={`${link.name} URL`}
                disabled={!link.enabled}
                className="flex-1"
              />
            </div>
          ))}
          
          <Button onClick={handleSaveLinks}>Save Social Links</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FooterSocialEditor;
