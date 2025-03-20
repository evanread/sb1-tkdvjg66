import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Building2, CheckCircle2, CreditCard, Users, ArrowRight, Clock, ChevronDown, Smartphone, FileSpreadsheet, Bell, Receipt, Calculator, BarChart3, CalendarClock, Mail, Shield, CircleDollarSign, CreditCard as CreditCardIcon, ShieldCheck } from 'lucide-react';
import { Modal } from './components/Modal';
import { supabase } from './lib/supabase';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    communityName: '',
    hoaSize: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeSelect = (size: string) => {
    setFormData(prev => ({
      ...prev,
      hoaSize: size
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            community_name: formData.communityName,
            hoa_size: parseInt(formData.hoaSize, 10)
          }
        ]);

      if (error) throw error;
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      communityName: '',
      hoaSize: ''
    });
    setSubmitted(false);
    setIsModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submitted={submitted}
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        onSizeSelect={handleSizeSelect}
        resetForm={resetForm}
      />
      
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-soft z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-neutral-900">Venra</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add margin-top to account for sticky header */}
      <div className="pt-20">
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden min-h-[calc(100vh-5rem)]">
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
          <div className="container mx-auto px-6 py-16 relative">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Coming Soon
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Collect your HOA dues on autopilot.
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-2xl">
                Venra makes it ridiculously easy to collect payments from homeowners — without manual tracking or spreadsheets.
              </p>
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-white">Built by HOA & real estate industry pros</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-white">Early access for waitlist members</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-white">Simple and easy to set up</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors flex items-center shadow-soft"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="https://i.imgur.com/ldJUNwj.png"
                  alt="Venra HOA Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Core Features */}
        <section id="features" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4 text-neutral-900">Everything You Need to Manage HOA Dues</h2>
            <p className="text-neutral-600 text-center mb-16 max-w-2xl mx-auto">
              Powerful features designed specifically for HOA board members to simplify dues collection and management.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Automated Dues Collection',
                  icon: CreditCard,
                  description: 'Accept recurring or one-time payments via ACH, credit, or debit cards. Residents can set up auto-pay and forget about it.'
                },
                {
                  title: 'Payment Tracking Dashboard',
                  icon: BarChart3,
                  description: 'Get a clear overview of who has paid, who is late, and total amounts collected. No more spreadsheet juggling.'
                },
                {
                  title: 'Smart Late Fee Management',
                  icon: Calculator,
                  description: 'Automatically calculate late fees and send notices to homeowners. Set it once and let the system handle the rest.'
                },
                {
                  title: 'Flexible Payment Schedules',
                  icon: CalendarClock,
                  description: 'Configure monthly, quarterly, annual, or custom billing cycles. Adapt to your community\'s needs.'
                },
                {
                  title: 'Digital Invoicing & Receipts',
                  icon: Receipt,
                  description: 'Generate and send professional invoices instantly. Homeowners receive immediate payment confirmations.'
                },
                {
                  title: 'Automated Communications',
                  icon: Mail,
                  description: 'Send automated payment reminders via email and SMS. Reduce late payments with timely notifications.'
                },
                {
                  title: 'Easy Financial Exports',
                  icon: FileSpreadsheet,
                  description: 'Export payment data to CSV/PDF for QuickBooks or your CPA. Simplify tax time and audits.'
                },
                {
                  title: 'Mobile-Friendly Portal',
                  icon: Smartphone,
                  description: 'Give residents 24/7 access to their payment history and account management from any device.'
                },
                {
                  title: 'Smart Notifications',
                  icon: Bell,
                  description: 'Keep everyone in the loop with automated alerts for payments, due dates, and account updates.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow">
                  <div className="bg-primary-50 rounded-lg p-3 inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-neutral-900">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Sign up & add your HOA',
                  icon: Building2,
                  description: 'Quick setup process with no technical knowledge required'
                },
                {
                  title: 'Set dues schedule',
                  icon: Clock,
                  description: 'Choose monthly, quarterly, or custom payment schedules'
                },
                {
                  title: 'Automated payments',
                  icon: CreditCard,
                  description: 'Homeowners receive secure payment links automatically'
                },
                {
                  title: 'Track everything',
                  icon: CheckCircle2,
                  description: 'Monitor payments and late dues with ease'
                }
              ].map((step, index) => (
                <div key={index} className="bg-neutral-50 p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow">
                  <div className="bg-primary-100 rounded-lg p-3 inline-block mb-4">
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-neutral-900">Simple, Transparent Pricing</h2>
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-primary-800 font-medium">All features included in every plan</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter',
                  price: 19,
                  homes: 10,
                  popular: false
                },
                {
                  name: 'Growth',
                  price: 39,
                  homes: 25,
                  popular: true
                },
                {
                  name: 'Scale',
                  price: 59,
                  homes: 50,
                  popular: false
                }
              ].map((plan, index) => (
                <div key={index} className={`rounded-xl ${plan.popular ? 'bg-primary-600 text-white scale-105' : 'bg-white'} p-8 shadow-soft hover:shadow-glow transition-all relative`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-soft">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={`${plan.popular ? 'text-primary-100' : 'text-neutral-500'}`}>/month</span>
                  </div>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Up to {plan.homes} homes
                    </li>
                    <li className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      2.9% + 30¢ per transaction
                    </li>
                    <li className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Early access
                    </li>
                  </ul>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full py-3 rounded-lg font-semibold ${
                      plan.popular 
                        ? 'bg-white text-primary-600 hover:bg-primary-50' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    } transition-colors shadow-soft`}
                  >
                    Join Waitlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stripe Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Safe & Secure Payments, <span className="text-[#635BFF]">Powered by Stripe</span>
              </h2>
              <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
                Venra uses Stripe to ensure every HOA payment is fast, secure, and fully compliant—so you never have to worry about handling dues manually.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-neutral-50 rounded-2xl p-8 shadow-soft">
                <div className="space-y-8">
                  {[
                    {
                      icon: Shield,
                      title: "Bank-Level Security",
                      description: "Enterprise-grade encryption protects every transaction"
                    },
                    {
                      icon: CircleDollarSign,
                      title: "Automated Deposits",
                      description: "Funds automatically deposited to your HOA's account"
                    },
                    {
                      icon: CreditCardIcon,
                      title: "Flexible Payments",
                      description: "Accept ACH, credit cards, and debit cards"
                    },
                    {
                      icon: ShieldCheck,
                      title: "Fully Compliant",
                      description: "100% PCI-compliant & fraud-protected"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-[#F6F5FF] rounded-lg p-3">
                        <feature.icon className="h-6 w-6 text-[#635BFF]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                        <p className="text-neutral-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-8 shadow-soft">
                <div className="flex justify-center mb-12">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    alt="Stripe Logo"
                    className="h-12"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-6">
                    <span className="text-neutral-600">Transaction Fee</span>
                    <span className="text-xl font-semibold">2.9% + 30¢</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-6">
                    <span className="text-neutral-600">Settlement Time</span>
                    <span className="text-xl font-semibold">2-3 business days</span>
                  </div>
                  <div className="flex items-center justify-center pt-4">
                    <Shield className="h-5 w-5 text-[#635BFF] mr-2" />
                    <span className="text-neutral-600">Trusted by 100,000+ businesses worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-neutral-900">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "When will Venra launch?",
                  a: "We're currently in private beta and will launch publicly soon. Join the waitlist to get early access!"
                },
                {
                  q: "What payment methods will be supported?",
                  a: "We'll support all major payment methods including ACH (bank transfers), credit cards, and debit cards. Residents can set up auto-pay for hassle-free dues collection."
                },
                {
                  q: "How will the late fee system work?",
                  a: "You'll set the rules (grace period, fee amount, etc.), and our system will automatically calculate and apply late fees. Residents will be notified automatically to prevent disputes."
                },
                {
                  q: "Will residents be able to view their payment history?",
                  a: "Yes! Each resident will get access to a secure portal where they can view their payment history, set up auto-pay, and download receipts."
                },
                {
                  q: "Is my HOA's data secure?",
                  a: "Absolutely. We use bank-level encryption to protect your data and comply with all relevant security standards."
                },
                {
                  q: "How long will it take to get started?",
                  a: "Most HOAs will be up and running in under 15 minutes. Our setup wizard makes it simple."
                },
                {
                  q: "What if my HOA doesn't like it?",
                  a: "No worries! You can cancel anytime. We'll offer a satisfaction guarantee to ensure you're happy with the service."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-neutral-200 rounded-xl shadow-soft hover:shadow-glow transition-shadow">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">{faq.q}</h3>
                    <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${openFaq === index ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                    <p className="text-neutral-600">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
          <div className="container mx-auto px-6 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to modernize your HOA dues collection?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the waitlist today to be among the first to experience Venra when we launch.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors inline-flex items-center shadow-soft"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <p className="text-white/90 mt-4">Get early access and special launch pricing</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Building2 className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">Venra</span>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link>
                <p className="text-neutral-400">© 2025 Venra. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;