
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      // For now we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast({
        title: "Request submitted",
        description: "We've received your request. Our team will contact you shortly.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-blue">Forgot Password</h1>
            <p className="mt-2 text-gray-600">
              {submitted 
                ? "Check your email for instructions" 
                : "Enter your email to reset your password"
              }
            </p>
          </div>

          <Card className="border-0 shadow-lg transform transition-all hover:shadow-xl">
            <CardHeader className="bg-brand-blue/5 pb-6">
              <CardTitle>Password Recovery</CardTitle>
              <CardDescription>
                {submitted 
                  ? "We've received your request" 
                  : "Enter your email address below"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
                    <Info className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      If you're having trouble recovering your password, please contact our support team directly at support@quickweb.com
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Reset Password"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <p className="mb-4">
                    Our team will review your request and get back to you shortly with password recovery instructions.
                  </p>
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">
                      For security reasons, password resets are manually processed by our team. Please check your inbox in the next 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center bg-gray-50 border-t">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/signin" className="font-medium text-brand-blue hover:underline transition-colors">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
