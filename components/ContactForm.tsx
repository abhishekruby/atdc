'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Test Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', text: result.message });
        setFormData({ name: '', phone: '', email: '', subject: 'Test Inquiry', message: '' });
      } else {
        setStatus({ type: 'error', text: result.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Failed to connect to the server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status && (
        <div className={`p-4 rounded-xl ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-semibold text-sm">{status.text}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Full Name *</label>
          <input 
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" 
            placeholder="John Doe" 
            type="text" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Phone Number *</label>
          <input 
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" 
            placeholder="+91 00000 00000" 
            type="tel" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Email Address *</label>
          <input 
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" 
            placeholder="john@example.com" 
            type="email" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Subject</label>
          <select 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface outline-none"
          >
            <option>Test Inquiry</option>
            <option>Home Collection</option>
            <option>Report Assistance</option>
            <option>General Feedback</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Message *</label>
          <textarea 
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" 
            placeholder="How can we help you today?" 
            rows={5}
          ></textarea>
        </div>
      </div>
      <button 
        disabled={loading}
        className="w-full bg-primary text-on-primary py-5 rounded-xl font-bold text-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed" 
        type="submit"
      >
        {loading ? 'Sending...' : 'Send Message'}
        {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>}
      </button>
    </form>
  );
}
