
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";

const ServicePage = () => {
  const { services } = useData();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "business", name: "Business Websites" },
    { id: "personal", name: "Personal Websites" },
    { id: "ecommerce", name: "Online Stores" },
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => {
        if (activeCategory === "business" && (service.type === "basic" || service.type === "standard")) return true;
        if (activeCategory === "personal" && (service.type === "basic" || service.type === "advanced")) return true;
        if (activeCategory === "ecommerce" && service.type === "ecommerce") return true;
        return false;
      });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We offer professional web development services tailored to your needs.
              From simple business websites to complex e-commerce solutions, we've got you covered.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="min-w-[120px]"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
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
                />
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">No services found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any services in this category.
                </p>
                <Button onClick={() => setActiveCategory("all")}>
                  View All Services
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We follow a streamlined process to ensure your project is delivered on time and exceeds your expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Choose Package</h3>
                <p className="text-gray-600">
                  Select the package that best fits your needs and budget.
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Provide Details</h3>
                <p className="text-gray-600">
                  Share your branding, content, and specific requirements.
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Website Creation</h3>
                <p className="text-gray-600">
                  We build your website based on your requirements.
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white text-xl font-bold mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Website Delivery</h3>
                <p className="text-gray-600">
                  Receive your files or let us set up hosting for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Contact us today to discuss your project and get a free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
