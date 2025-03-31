
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
        <path d="M16 8v8"/>
        <path d="M12 16v-8"/>
        <path d="M20 12V8a4 4 0 0 0-4-4h-4"/>
        <path d="M16 5.89A4 4 0 0 0 16.62 4"/>
      </svg>
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
