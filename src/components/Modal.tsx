import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Users } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitted: boolean;
  formData: {
    name: string;
    email: string;
    phone: string;
    communityName: string;
    hoaSize: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSizeSelect: (size: string) => void;
  resetForm: () => void;
}

const PRICING_TIERS = [
  { name: 'Starter', homes: '10', description: 'Up to 10 homes' },
  { name: 'Growth', homes: '25', description: 'Up to 25 homes' },
  { name: 'Scale', homes: '50', description: 'Up to 50 homes' }
];

export function Modal({
  isOpen,
  onClose,
  submitted,
  formData,
  onSubmit,
  onChange,
  onSizeSelect,
  resetForm,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    const match = phone.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    return !match[2] ? match[1] 
      : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: formatted,
        name: 'phone'
      }
    });
  };

  if (!isOpen) return null;

  const modalContent = submitted ? (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-soft"
        tabIndex={-1}
      >
        <button 
          onClick={resetForm}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="text-center">
          <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-neutral-900">Thank You!</h2>
          <p className="text-neutral-600 mb-6">
            You've been added to our waitlist. We'll notify you when Venra launches!
          </p>
          <button
            onClick={resetForm}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-soft"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Join the Waitlist</h2>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="communityName" className="block text-sm font-medium text-neutral-700 mb-1">HOA Community Name</label>
              <input
                type="text"
                id="communityName"
                name="communityName"
                value={formData.communityName}
                onChange={onChange}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
                autoComplete="organization"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Community Size</label>
              <div className="grid grid-cols-3 gap-3">
                {PRICING_TIERS.map((tier) => (
                  <button
                    key={tier.homes}
                    type="button"
                    onClick={() => onSizeSelect(tier.homes)}
                    className={`flex flex-col items-center p-3 border rounded-lg transition-all ${
                      formData.hoaSize === tier.homes
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50'
                    }`}
                  >
                    <Users className={`h-5 w-5 mb-1 ${
                      formData.hoaSize === tier.homes ? 'text-primary-600' : 'text-neutral-500'
                    }`} />
                    <span className="text-sm font-medium">{tier.name}</span>
                    <span className="text-xs text-neutral-500">{tier.description}</span>
                  </button>
                ))}
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}