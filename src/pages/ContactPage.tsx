import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { sendContactMessage, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }

    sendContactMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Private Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Contact Our Atelier
        </h1>
        <p className="text-sm text-slate-600">
          Whether you require bespoke bridal party sizing assistance, custom gala tailoring consultations, or delivery inquiries, our fashion concierge is devoted to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Flagship Atelier Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Flagship Showroom & Concierge
            </h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8E1EA2] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Atelier Location</strong>
                  <span>742 Fifth Avenue, Atelier Suite 18</span>
                  <span className="block text-slate-400">New York, NY 10019, United States</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#8E1EA2] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Telephone Concierge</strong>
                  <span>+1 (800) 845-9623</span>
                  <span className="block text-slate-400">Direct VIP styling line</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#8E1EA2] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Electronic Mail</strong>
                  <span>concierge@womenclothing.fashion</span>
                  <span className="block text-slate-400">Responses guaranteed within 4 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#8E1EA2] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Opening Hours</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:00 PM EST</span>
                  <span className="block text-slate-400">Sunday: Private appointments by request</span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Follow Our Runway Journeys:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  onClick={e => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#8E1EA2] hover:bg-[#FFC0DE]/30 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  onClick={e => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#8E1EA2] hover:bg-[#FFC0DE]/30 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#pinterest"
                  onClick={e => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#8E1EA2] hover:bg-[#FFC0DE]/30 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Send a Message
            </h2>
            <p className="text-xs text-slate-500">
              Your inquiry will be logged directly to our admin concierge desk.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-emerald-900">
                Message Received
              </h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Thank you! Our senior styling concierge will review your message and reply via email promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-[#8E1EA2] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helena Beaumont"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="helena@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telephone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bridal Consultation / Sizing Inquiry"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can our atelier assist you today? Please include any dress names or event dates..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs text-white shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message to Atelier</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
