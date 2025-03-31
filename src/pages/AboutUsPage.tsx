
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";

const AboutUsPage = () => {
  const { aboutContent } = useData();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Get to know our team and our story
            </p>
          </div>
        </section>

        {/* About Us Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: aboutContent?.story || "QuickWeb Creations was founded with a simple mission: to provide affordable, high-quality websites for businesses of all sizes. Our team of experienced developers and designers work together to create beautiful, functional websites that help our clients succeed online." }} />
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-blue to-brand-lightblue p-1 rounded-lg shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Our Team"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <div className="prose prose-lg max-w-3xl mx-auto text-center" 
                dangerouslySetInnerHTML={{ __html: aboutContent?.mission || "Our mission is to empower businesses with beautiful, functional, and affordable websites. We believe that every business deserves a great online presence, regardless of size or budget." }} />
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {(aboutContent?.team || [
                  {
                    name: "Sarah Johnson",
                    role: "Founder & CEO",
                    bio: "With over 10 years of experience in web development and design, Sarah leads our team with passion and expertise.",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                  },
                  {
                    name: "Michael Lee",
                    role: "Lead Developer",
                    bio: "Michael specializes in front-end development and has a keen eye for creating responsive, user-friendly websites.",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                  },
                  {
                    name: "Emma Rodriguez",
                    role: "UX Designer",
                    bio: "Emma combines creative design with user experience expertise to create websites that are both beautiful and functional.",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                  },
                  {
                    name: "David Chen",
                    role: "Project Manager",
                    bio: "David ensures all projects are delivered on time and to the highest standard, with excellent communication throughout.",
                    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                  }
                ]).map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover object-center"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                      <p className="text-brand-blue mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-brand-blue text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Understand</h3>
                  <p className="text-gray-600">We take the time to understand your business, goals, and target audience before starting any project.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-brand-blue text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create</h3>
                  <p className="text-gray-600">Our team designs and develops a website that reflects your brand and meets your specific requirements.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-brand-blue text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deliver</h3>
                  <p className="text-gray-600">We deliver your website on time and provide support to ensure you're completely satisfied with the result.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Let's create something amazing together. Contact us today to discuss your project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                onClick={() => navigate("/services")}
              >
                Our Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
