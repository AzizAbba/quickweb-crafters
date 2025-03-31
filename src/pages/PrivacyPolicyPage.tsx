
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";

const PrivacyPolicyPage = () => {
  const { legalContent } = useData();

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: legalContent?.privacyPolicy || `
              <p class="mb-4">Last updated: ${new Date().toLocaleDateString()}</p>
              
              <h2>1. Introduction</h2>
              <p>At QuickWeb Creations, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
              
              <h2>2. Information We Collect</h2>
              <p>We collect information you provide directly to us when you:</p>
              <ul>
                <li>Create an account</li>
                <li>Place an order</li>
                <li>Fill out a contact form</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Process your transactions</li>
                <li>Communicate with you about your orders</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
              
              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
              
              <h2>5. Third-Party Services</h2>
              <p>We may use third-party services to help us operate our business and the website or administer activities on our behalf.</p>
              
              <h2>6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal data, including the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Object to or restrict processing</li>
              </ul>
              
              <h2>7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              
              <h2>8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@quickweb.com</p>
            ` }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
