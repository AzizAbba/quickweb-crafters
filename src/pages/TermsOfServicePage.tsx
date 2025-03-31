
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";

const TermsOfServicePage = () => {
  const { legalContent } = useData();

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: legalContent?.termsOfService || `
              <p class="mb-4">Last updated: ${new Date().toLocaleDateString()}</p>
              
              <h2>1. Agreement to Terms</h2>
              <p>By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              
              <h2>2. Description of Services</h2>
              <p>QuickWeb Creations provides web development, design, and related services as described on our website.</p>
              
              <h2>3. Payments and Fees</h2>
              <p>Payment terms will be agreed upon before work begins. We accept various payment methods as indicated during the checkout process.</p>
              
              <h2>4. Ownership and Intellectual Property</h2>
              <p>Upon full payment, clients receive ownership of the final deliverables. QuickWeb Creations retains the right to display the work in portfolios and for promotional purposes unless otherwise agreed.</p>
              
              <h2>5. Client Responsibilities</h2>
              <p>Clients are responsible for providing necessary materials and feedback in a timely manner to complete projects. Delays from the client side may affect project timelines.</p>
              
              <h2>6. Project Changes and Revisions</h2>
              <p>The number of revisions included depends on the service package. Additional revisions may incur extra charges.</p>
              
              <h2>7. Limitation of Liability</h2>
              <p>QuickWeb Creations is not liable for any indirect, consequential, or incidental damages arising from the use of our services.</p>
              
              <h2>8. Termination</h2>
              <p>Either party may terminate the service agreement with written notice. Cancellation fees may apply depending on project progress.</p>
              
              <h2>9. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
              
              <h2>10. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website.</p>
              
              <h2>11. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at terms@quickweb.com</p>
            ` }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
