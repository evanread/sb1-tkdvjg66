import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="prose max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-neutral-600 mb-6">Last updated: March 20, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using Venra's services, you agree to be bound by these Terms of Service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
            <p className="mb-4">Venra provides HOA management and payment processing services, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Payment processing</li>
              <li>HOA dues management</li>
              <li>Resident communications</li>
              <li>Financial reporting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate information</li>
              <li>Maintain account security</li>
              <li>Comply with applicable laws</li>
              <li>Pay all fees when due</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
            <p>Details about pricing, payment processing, and refunds.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p>For questions about these Terms, please contact us at legal@venra.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}