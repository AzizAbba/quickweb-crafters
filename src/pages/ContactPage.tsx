
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useAuth } from "@/context/AuthContext";

const ContactPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions or ready to start your project? Contact us today for a free consultation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                  Alternatively, you can reach us directly using the information below.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email</h3>
                      <a href="mailto:contact@quickweb.com" className="text-brand-blue hover:underline">contact@quickweb.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Office</h3>
                      <p className="text-gray-600">Remote Team - Available Worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Phone</h3>
                      <p className="text-brand-blue hover:underline">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-3xl font-bold mb-6">We'd love to hear from you</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Whether you have a question about our services, pricing, or just want to say hello, we're here to help. Contact us using the form and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Quick Response Time</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Free Consultations</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Personalized Solutions</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Our Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map/Location Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We Work Globally</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Our team serves clients worldwide, providing high-quality web development services regardless of location.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 max-w-5xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 h-[400px] flex items-center justify-center">
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
