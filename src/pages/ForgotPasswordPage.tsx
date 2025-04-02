
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        description: "If your email is in our system, you'll receive instructions shortly.",
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

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-brand-blue/5 pb-6">
              <CardTitle>Password Recovery</CardTitle>
              <CardDescription>
                {submitted 
                  ? "We've sent you an email with recovery instructions" 
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

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Reset Password"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-4">
                    If your email address is associated with an account, you will receive an email with password reset instructions.
                  </p>
                  <p className="text-sm text-gray-500">
                    Please check your inbox and spam folder.
                  </p>
                </div>
              )}
              
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  If you don't receive an email or need immediate assistance, please contact our support team directly.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center bg-gray-50 border-t">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/signin" className="font-medium text-brand-blue hover:underline">
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
