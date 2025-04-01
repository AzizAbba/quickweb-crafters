
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";

const AboutUsPage = () => {
  const { siteContent, aboutContent } = useData();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {siteContent.aboutTitle || "About Us"}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {siteContent.aboutSubtitle || "Our story, mission, and the team behind QuickWeb Creations"}
            </p>
          </div>
        </section>

        {/* Story Section */}
        {aboutContent.story && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="prose prose-lg max-w-none">
                    {aboutContent.story.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <img 
                    src={siteContent.teamImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt="Our Team" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mission Section */}
        {aboutContent.mission && (
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="prose prose-lg mx-auto">
                {aboutContent.mission.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {siteContent.aboutSections && siteContent.aboutSections.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              {siteContent.aboutSections.map((section, index) => (
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

export default AboutUsPage;
