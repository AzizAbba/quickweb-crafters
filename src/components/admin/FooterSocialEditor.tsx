
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, ExternalLink, Copy, Check } from "lucide-react";
import TikTok from "@/components/admin/TikTok"; // Import custom TikTok component
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  url: string;
  enabled: boolean;
  icon: React.ReactNode;
  color: string;
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
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    { 
      name: "instagram", 
      url: initialSocialLinks.instagram || "", 
      enabled: !!initialSocialLinks.instagram,
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-500"
    },
    { 
      name: "twitter", 
      url: initialSocialLinks.twitter || "", 
      enabled: !!initialSocialLinks.twitter,
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-sky-400"
    },
    { 
      name: "linkedin", 
      url: initialSocialLinks.linkedin || "", 
      enabled: !!initialSocialLinks.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-blue-700"
    },
    { 
      name: "youtube", 
      url: initialSocialLinks.youtube || "", 
      enabled: !!initialSocialLinks.youtube,
      icon: <Youtube className="h-5 w-5" />,
      color: "bg-red-600"
    },
    { 
      name: "tiktok", 
      url: initialSocialLinks.tiktok || "", 
      enabled: !!initialSocialLinks.tiktok,
      icon: <TikTok className="h-5 w-5" />,
      color: "bg-gray-800"
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleUrlChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index].url = value;
    setSocialLinks(updated);
  };

  const handleToggleChange = (index: number, checked: boolean) => {
    const updated = [...socialLinks];
    updated[index].enabled = checked;
    setSocialLinks(updated);

    // If enabled without a URL, show a toast prompt
    if (checked && !updated[index].url.trim()) {
      toast({
        title: `${updated[index].name.charAt(0).toUpperCase() + updated[index].name.slice(1)} Enabled`,
        description: "Don't forget to add your profile URL!",
      });
    }
  };

  const handleSaveLinks = () => {
    setIsSaving(true);
    
    const socialObj = socialLinks.reduce((acc, link) => {
      if (link.enabled && link.url.trim()) {
        acc[link.name] = link.url.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    // Simulate an API call
    setTimeout(() => {
      onSave(socialObj);
      
      toast({
        title: "Social Links Updated",
        description: "Footer social media links have been updated successfully.",
      });
      
      setIsSaving(false);
    }, 600);
  };

  const copyToClipboard = (url: string, name: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
      
      toast({
        title: "URL Copied",
        description: `The ${name} URL has been copied to your clipboard.`,
      });
    });
  };

  const previewUrl = (url: string) => {
    if (!url.trim()) return;
    
    // Ensure URL has protocol
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    
    window.open(finalUrl, '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="flex items-center gap-2 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Social Media Links
          </CardTitle>
          <CardDescription>
            Configure the social media links that will appear in your website's footer
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {socialLinks.map((link, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border ${link.enabled ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200' : 'bg-gray-50 border-gray-100'} transition-all duration-200`}
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Switch 
                    checked={link.enabled} 
                    onCheckedChange={(checked) => handleToggleChange(index, checked)} 
                    id={`enable-${link.name}`}
                  />
                  
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${link.color}`}>
                    {link.icon}
                  </div>
                  
                  <Label htmlFor={`${link.name}-url`} className="capitalize font-medium">
                    {link.name}
                  </Label>
                </div>
                
                <div className="flex-1 relative">
                  <Input
                    id={`${link.name}-url`}
                    value={link.url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder={`Your ${link.name} profile URL`}
                    disabled={!link.enabled}
                    className={`pr-16 transition-all ${link.enabled ? 'border-gray-300 focus:border-brand-blue' : 'bg-gray-100 text-gray-400'}`}
                  />
                  
                  {link.url && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {copied === link.name ? (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-green-600"
                          disabled
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => copyToClipboard(link.url, link.name)}
                          disabled={!link.enabled}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy URL</span>
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => previewUrl(link.url)}
                        disabled={!link.enabled || !link.url.trim()}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-between items-center mt-6">
              <div>
                <Badge variant="outline" className="text-gray-500">
                  {socialLinks.filter(link => link.enabled && link.url.trim()).length} Active Links
                </Badge>
              </div>
              <Button 
                onClick={handleSaveLinks} 
                disabled={isSaving}
                className="relative overflow-hidden group"
              >
                {isSaving ? (
                  <>
                    <span className="inline-block animate-pulse">Saving...</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </>
                ) : (
                  <>
                    Save Social Links
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FooterSocialEditor;
