
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useData } from "@/context/DataContext";

const ContactPage = () => {
  const { siteContent } = useData();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {siteContent.contactTitle || "Contact Us"}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {siteContent.contactSubtitle || "Get in touch with our team. We're here to help with all your website needs."}
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have a question, feedback, or interested in our services? Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-lg text-gray-600">
                      {siteContent.contactEmail || "contact@quickweb.com"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-lg text-gray-600">
                      {siteContent.contactPhone || "+1 (555) 123-4567"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p className="text-lg text-gray-600">
                      {siteContent.contactAddress || "Remote Team - Available Worldwide"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* We Work Globally Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">We Work Globally</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our team provides web development services worldwide. No matter where you are, we can help you create a stunning online presence.
              </p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src={siteContent.globalTeamImage || "/lovable-uploads/18d521e2-4263-49c2-b198-619c922b08c4.png"} 
                alt="Global Team" 
                className="rounded-lg shadow-lg max-w-full md:max-w-3xl"
              />
            </div>
          </div>
        </section>

        {/* Custom Sections */}
        {siteContent.contactSections && siteContent.contactSections.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              {siteContent.contactSections.map((section, index) => (
                <div key={section.id} className={`mb-16 ${index % 2 === 0 ? '' : 'flex flex-col-reverse md:flex-row-reverse'}`}>
                  <div className={`grid grid-cols-1 ${section.image ? 'md:grid-cols-2' : ''} gap-8 items-center`}>
                    {section.image && (
                      <div className="flex justify-center">
                        <img 
                          src={section.image} 
                          alt={section.title} 
                          className="rounded-lg shadow-md max-w-full h-auto"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                      <div className="prose prose-lg max-w-none">
                        {section.content.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4 text-gray-600">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
