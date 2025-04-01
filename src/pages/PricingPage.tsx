
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPage = () => {
  const { services, siteContent } = useData();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{siteContent.pricingTitle || "Transparent Pricing"}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {siteContent.pricingSubtitle || "Choose from our affordable packages designed to meet your needs. No hidden fees, just straightforward pricing."}
            </p>
          </div>
        </section>

        {/* Pricing Tabs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Select Your Package</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {siteContent.pricingDescription || "We offer a variety of packages to suit your needs and budget. Not sure which to choose? Contact us for a custom quote."}
              </p>
            </div>
            
            <Tabs defaultValue="all" className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
                <TabsTrigger value="all">All Packages</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="ecommerce">E-Commerce</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description}
                      features={service.features}
                      price={service.price}
                      deliveryTime={service.deliveryTime}
                      ctaText="Order Now"
                      ctaLink="/contact"
                      type={service.type}
                      imageUrl={service.imageUrl}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="business">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services
                    .filter(s => s.type === "basic" || s.type === "standard" || s.type === "advanced")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        features={service.features}
                        price={service.price}
                        deliveryTime={service.deliveryTime}
                        ctaText="Order Now"
                        ctaLink="/contact"
                        type={service.type}
                        imageUrl={service.imageUrl}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ecommerce">
                <div className="max-w-md mx-auto">
                  {services
                    .filter(s => s.type === "ecommerce")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        features={service.features}
                        price={service.price}
                        deliveryTime={service.deliveryTime}
                        ctaText="Order Now"
                        ctaLink="/contact"
                        type={service.type}
                        imageUrl={service.imageUrl}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our packages? Find answers to commonly asked questions below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What's included in each package?</h3>
                <p className="text-gray-600">
                  Each package includes responsive design, SEO optimization, and all the features listed. 
                  You'll receive a complete, ready-to-launch website tailored to your needs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Do I need to pay for hosting?</h3>
                <p className="text-gray-600">
                  Hosting is not included in our packages, but we can set up free GitHub Pages hosting for you.
                  Alternatively, you can host your website anywhere you prefer.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">How many revisions are included?</h3>
                <p className="text-gray-600">
                  We include 2 rounds of revisions in all packages to ensure you're completely satisfied with your website.
                  Additional revisions can be arranged at a small fee.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Can I upgrade my package later?</h3>
                <p className="text-gray-600">
                  {siteContent.pricingFaq || "Yes, you can upgrade from a basic package to a more advanced one. You'll only need to pay the difference between the packages plus a small upgrade fee."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 hero-gradient text-white">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Don't see what you're looking for? We offer custom packages tailored to your specific needs.
              Get in touch to discuss your project.
            </p>
            <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
              <Link to="/contact">Contact for Custom Quote</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage;
