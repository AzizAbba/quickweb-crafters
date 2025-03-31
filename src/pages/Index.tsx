
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { useData } from "@/context/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const { services, testimonials, siteContent } = useData();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {siteContent?.heroTitle || "Professional Websites, Delivered Fast"}
                </h1>
                <p className="text-xl mb-8 max-w-lg">
                  {siteContent?.heroSubtitle || "We design modern, responsive, and SEO-optimized websites for businesses, individuals, and entrepreneurs."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                    <Link to="/services">Our Services</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in">
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Web Development"
                      className="rounded-lg w-full"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg hidden md:block">
                    <div className="text-gray-800 font-bold">100+ Projects</div>
                    <div className="text-gray-500 text-sm">Delivered on Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer a range of web development services to meet your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(services || []).map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  features={service.features.slice(0, 3)}
                  price={service.price}
                  deliveryTime={service.deliveryTime}
                  ctaText="Learn More"
                  ctaLink="/services"
                  type={service.type}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/pricing">View All Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About QuickWeb Creations</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {siteContent?.aboutContent || "QuickWeb Creations is a professional web development service that helps businesses, individuals, and entrepreneurs establish a strong online presence."}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-brand-blue">100+</div>
                    <div className="text-gray-600">Projects Delivered</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-brand-blue">98%</div>
                    <div className="text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="bg-gradient-to-br from-brand-blue to-brand-lightblue p-1 rounded-lg shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Our Team"
                      className="rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't take our word for it. See what our clients have to say about our work.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(testimonials || []).map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  image={testimonial.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 hero-gradient text-white">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's build something amazing together. Get in touch today for a free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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

export default Index;
