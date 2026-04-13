'use client';

import { useState } from 'react';
import AnimatedReveal from '@/components/AnimatedReveal';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Pathology',
    doctor: 'Select Doctor',
    date: '',
    slot: 'Morning (9 AM - 12 PM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', text: result.message });
        setFormData({
          name: '',
          phone: '',
          department: 'Pathology',
          doctor: 'Select Doctor',
          date: '',
          slot: 'Morning (9 AM - 12 PM)',
          message: '',
        });
      } else {
        setStatus({ type: 'error', text: result.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Failed to connect to the server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getBookingDateBounds = () => {
    const now = new Date();
    const cutOffHour = 17; // 5:00 PM
    
    let minDaysOffset = 0;
    if (now.getHours() >= cutOffHour) {
      minDaysOffset = 1;
    }
    
    const minD = new Date(now);
    minD.setDate(now.getDate() + minDaysOffset);
    
    const maxD = new Date(now);
    maxD.setDate(now.getDate() + 7); // Allow up to 7 days advance booking
    
    return {
      min: minD.toISOString().split('T')[0],
      max: maxD.toISOString().split('T')[0]
    };
  };

  const { min: minDate, max: maxDate } = getBookingDateBounds();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Hero & Form Canvas */}
        <div className="lg:col-span-8 space-y-12">
          <AnimatedReveal className="space-y-4">
            <span className="text-secondary font-bold tracking-[0.2em] text-[0.75rem] uppercase">Quick Reservation</span>
            <h1 className="text-[3.5rem] font-extrabold text-primary leading-[1.1] tracking-tighter">
              Book Your Appointment in <span className="text-secondary">60 Seconds</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              Streamlined diagnostic care. Choose your specialist and preferred time slot in a few easy steps.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1} className="bg-surface-container-low rounded-[2rem] p-8 md:p-12 shadow-sm border border-outline-variant/10">
            {status && (
              <div className={`mb-8 p-6 rounded-2xl ${status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                <p className="font-semibold">{status.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Full Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none" 
                  placeholder="John Doe" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Phone Number</label>
                <input 
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none" 
                  placeholder="+91 00000 00000" 
                  type="tel" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Department</label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                >
                  <option>Pathology</option>
                  <option>Radiology</option>
                  <option>Cardiology</option>
                  <option>General Checkup</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Preferred Doctor</label>
                <select 
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                >
                  <option>Select Doctor</option>
                  <option>Dr. Sharma (Pathology)</option>
                  <option>Dr. Mehta (Radiology)</option>
                  <option>Dr. Patel (Cardiology)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Appointment Date</label>
                <input 
                  required
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none" 
                  type="date" 
                  min={minDate}
                  max={maxDate}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Preferred Slot</label>
                <select 
                  name="slot"
                  value={formData.slot}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 4 PM)</option>
                  <option>Evening (5 PM - 8 PM)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Additional Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none" 
                  placeholder="Any specific requirements or symptoms..." 
                  rows={4}
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button 
                  disabled={loading}
                  className="w-full h-16 bg-primary text-on-primary rounded-2xl font-bold text-lg hover:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2" 
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          </AnimatedReveal>
        </div>

        {/* Right: Side Panel */}
        <aside className="lg:col-span-4 space-y-8 sticky top-32">
          {/* Info Card */}
          <AnimatedReveal delay={0.2} className="bg-primary text-on-primary rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Need Assistance?</h3>
              <p className="text-primary-fixed-dim text-lg leading-relaxed">
                Our patient care coordinators are available 24/7 to help you with the booking process.
              </p>
              <div className="space-y-4">
                <a className="flex items-center gap-4 group/btn" href="tel:02612277119">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center group-hover/btn:bg-secondary transition-colors">
                    <span className="material-symbols-outlined text-white">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">Prefer to call?</p>
                    <p className="text-lg font-bold">0261-227-7119</p>
                  </div>
                </a>
                <a className="flex items-center gap-4 group/btn" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.`} target="_blank" rel="noreferrer">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 invert" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">Direct Support</p>
                    <p className="text-lg font-bold">WhatsApp us</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
          </AnimatedReveal>

          {/* Process Card */}
          <AnimatedReveal delay={0.3} className="bg-surface-container rounded-3xl p-8 space-y-6">
            <h4 className="text-lg font-bold text-primary">What happens next?</h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <p className="text-sm text-on-surface-variant leading-snug">Instant confirmation of your request via WhatsApp.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <p className="text-sm text-on-surface-variant leading-snug">Staff will review and confirm your slot shortly.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <p className="text-sm text-on-surface-variant leading-snug">Priority walk-in at the scheduled hour.</p>
              </li>
            </ul>
          </AnimatedReveal>

          {/* Image Card */}
          <AnimatedReveal delay={0.4} className="rounded-3xl overflow-hidden h-64 relative">
            <img alt="Clinical Excellence" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrqDn8SYYojpGzlMI_K-SCO5c_xEKiOOzamPsZjDWddE04G_PuGZM_EGcT_cVgeS75I0Lzo0DPVgRX6eYyx_ESh5JzfQzcmI81HhNYNtHXxqM7oUpg8OJSdeda8UeK2NfMWpaxdqNB--2CY7MCiqfQPqeTsjRkGq0EMF8qS5MwMYvqDHasAWVh1ZijsBp8hwdp1LFE3pdWhZj4KHlh1tfAvV43xlkTFbutq2S9drYrvZBM_RMVVMmDGl3NJLYg6e3MY4jZ_jkl8t_L" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <p className="text-white font-medium text-sm">State-of-the-art facilities at your service.</p>
            </div>
          </AnimatedReveal>
        </aside>
      </div>
    </div>
  );
}
