
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LegalEditorProps {
  initialContent: {
    privacyPolicy?: string;
    termsOfService?: string;
  };
  onSave: (content: any) => void;
}

const LegalEditor = ({ initialContent, onSave }: LegalEditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState({
    privacyPolicy: initialContent?.privacyPolicy || "",
    termsOfService: initialContent?.termsOfService || "",
  });

  const handleContentChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveContent = () => {
    onSave(content);
    
    toast({
      title: "Legal Content Updated",
      description: "Privacy Policy and Terms of Service have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Content</CardTitle>
        <CardDescription>
          Edit your Privacy Policy and Terms of Service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy" className="space-y-4">
            <div className="border rounded-md p-4 min-h-[400px]">
              <div
                className="h-full w-full outline-none"
                contentEditable
                dangerouslySetInnerHTML={{ __html: content.privacyPolicy }}
                onBlur={(e) => handleContentChange('privacyPolicy', e.currentTarget.innerHTML)}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
              <p>Use HTML formatting for headings, lists, and paragraphs.</p>
              <p>Example: &lt;h2&gt;Heading&lt;/h2&gt; &lt;p&gt;Paragraph&lt;/p&gt; &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;</p>
            </div>
          </TabsContent>
          
          <TabsContent value="terms" className="space-y-4">
            <div className="border rounded-md p-4 min-h-[400px]">
              <div
                className="h-full w-full outline-none"
                contentEditable
                dangerouslySetInnerHTML={{ __html: content.termsOfService }}
                onBlur={(e) => handleContentChange('termsOfService', e.currentTarget.innerHTML)}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
              <p>Use HTML formatting for headings, lists, and paragraphs.</p>
              <p>Example: &lt;h2&gt;Heading&lt;/h2&gt; &lt;p&gt;Paragraph&lt;/p&gt; &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveContent}>Save Legal Content</Button>
      </CardFooter>
    </Card>
  );
};

export default LegalEditor;
