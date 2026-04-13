'use client';

import { useState } from 'react';
import AnimatedReveal from '@/components/AnimatedReveal';
import Link from 'next/link';

const TEST_CATEGORIES = [
  { label: 'Blood Tests', icon: 'water_drop', tests: ['CBC (Complete Blood Count)', 'Blood Sugar', 'HbA1c', 'Lipid Profile'] },
  { label: 'Thyroid & Hormones', icon: 'labs', tests: ['Thyroid Profile (T3/T4/TSH)', 'Vitamin D & B12', 'Iron Studies'] },
  { label: 'Kidney & Liver', icon: 'favorite', tests: ['Kidney Function Test (KFT)', 'Liver Function Test (LFT)', 'Urine Routine'] },
  { label: 'Heart Health', icon: 'ecg_heart', tests: ['Lipid Profile', 'HsCRP', 'Homocysteine'] },
];

export default function HomeCollectionPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', tests: '', date: '', timeSlot: 'Morning (8 AM - 11 AM)',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTest = (test: string) => {
    setSelectedTests(prev => {
      const updated = prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test];
      setFormData(fd => ({ ...fd, tests: updated.join(', ') }));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/home-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Website' }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ type: 'success', text: result.message });
        setFormData({ name: '', phone: '', address: '', tests: '', date: '', timeSlot: 'Morning (8 AM - 11 AM)' });
        setSelectedTests([]);
      } else {
        setStatus({ type: 'error', text: result.message || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getDateBounds = () => {
    const now = new Date();
    const cutOffHour = 17; // 5:00 PM cutoff for same day appointments
    
    let minDaysOffset = 0;
    if (now.getHours() >= cutOffHour) {
      minDaysOffset = 1;
    }
    
    const minD = new Date(now);
    minD.setDate(now.getDate() + minDaysOffset);
    
    const maxD = new Date(now);
    maxD.setDate(now.getDate() + minDaysOffset + 1); // 2 days total including min
    
    return {
      min: minD.toISOString().split('T')[0],
      max: maxD.toISOString().split('T')[0]
    };
  };

  const { min: minDate, max: maxDate } = getDateBounds();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero */}
      <AnimatedReveal className="mb-16">
        <span className="label-md text-secondary font-bold tracking-[0.2em] uppercase mb-4 block">Doorstep Diagnostics</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tight font-headline mb-6">
          Home <span className="text-secondary">Collection</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Skip the commute. Our certified phlebotomists come to your home across all of Surat — available 24 hours a day, 7 days a week.
        </p>
      </AnimatedReveal>

      {/* Stats Strip */}
      <AnimatedReveal delay={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { icon: 'schedule', label: 'Available', value: '24 / 7' },
          { icon: 'timer', label: 'Home Visit', value: '< 2 hrs' },
          { icon: 'location_city', label: 'Coverage', value: 'All Surat' },
          { icon: 'verified', label: 'Certified', value: 'Phlebotomists' },
        ].map(s => (
          <div key={s.label} className="bg-surface-container-low rounded-2xl p-5 text-center">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2 block">{s.icon}</span>
            <p className="text-2xl font-extrabold text-primary">{s.value}</p>
            <p className="text-xs text-on-surface-variant font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </AnimatedReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-8 space-y-8">

          {/* Quick Test Picker */}
          <AnimatedReveal delay={0.1}>
            <h2 className="text-xl font-bold text-primary mb-5">Common Tests — Quick Select</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEST_CATEGORIES.map(cat => (
                <div key={cat.label} className="bg-surface-container-low rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-secondary">{cat.icon}</span>
                    <h3 className="font-bold text-primary text-sm">{cat.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.tests.map(test => (
                      <button
                        key={test}
                        type="button"
                        onClick={() => toggleTest(test)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                          selectedTests.includes(test)
                            ? 'bg-secondary text-white'
                            : 'bg-surface-container text-on-surface-variant hover:bg-secondary/10'
                        }`}
                      >
                        {selectedTests.includes(test) && '✓ '}{test}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedReveal>

          {/* Main Form */}
          <AnimatedReveal delay={0.2} className="bg-surface-container-low rounded-[2rem] p-8 md:p-12 shadow-sm">
            {status && (
              <div className={`mb-8 p-6 rounded-2xl flex items-start gap-4 ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <span className="material-symbols-outlined shrink-0">
                  {status.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <p className="font-semibold">{status.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Full Name *</label>
                <input required name="name" value={formData.name} onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="e.g. Rahul Sharma" type="text" />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">WhatsApp Number *</label>
                <input required name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="+91 97278 51561" type="tel" />
              </div>

              {/* Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Complete Address *</label>
                <textarea required name="address" value={formData.address} onChange={handleChange}
                  className="w-full p-5 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="Flat/House no., Society, Street, Area, Landmark, Surat" rows={3} />
              </div>

              {/* Tests */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Tests Required</label>
                <textarea name="tests" value={formData.tests} onChange={handleChange}
                  className="w-full p-5 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="Selected above, or type custom tests here... (e.g. CBC, HbA1c, Thyroid)" rows={2} />
                <p className="text-xs text-on-surface-variant ml-1">Use the quick-select above or type custom tests. Our team will confirm exact tests.</p>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Preferred Date *</label>
                <input required name="date" value={formData.date} onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none"
                  type="date" min={minDate} max={maxDate} />
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary ml-1">Preferred Time *</label>
                <select required name="timeSlot" value={formData.timeSlot} onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border-none bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none">
                  <option>Morning (8 AM - 11 AM)</option>
                  <option>Mid-day (11 AM - 2 PM)</option>
                  <option>Afternoon (2 PM - 5 PM)</option>
                </select>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 pt-2">
                <button disabled={loading} type="submit"
                  className="w-full h-16 bg-secondary text-white rounded-2xl font-bold text-lg hover:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg flex items-center justify-center gap-3">
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Scheduling...</>
                  ) : (
                    <><span className="material-symbols-outlined">home</span>Schedule Home Collection</>
                  )}
                </button>
                <p className="text-center text-xs text-on-surface-variant mt-4">
                  Our team will call to confirm within 1 hour. Fasting samples collected before 10 AM preferred.
                </p>
              </div>
            </form>
          </AnimatedReveal>
        </div>

        {/* Right: Info Panel */}
        <aside className="lg:col-span-4 space-y-6 sticky top-32">
          {/* WhatsApp CTA */}
          <AnimatedReveal delay={0.3} className="bg-[#25D366] text-white rounded-3xl p-7 relative overflow-hidden">
            <div className="relative z-10">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 invert mb-3" />
              <h3 className="text-xl font-bold mb-2">Book via WhatsApp</h3>
              <p className="text-white/85 text-sm mb-4">Even faster — just message us and our assistant Priya will schedule your home collection.</p>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20home%20collection.`}
                target="_blank" rel="noreferrer"
                className="inline-block bg-white text-[#25D366] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-50 transition-all">
                Chat on WhatsApp →
              </a>
            </div>
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
          </AnimatedReveal>

          {/* How it works */}
          <AnimatedReveal delay={0.4} className="bg-surface-container rounded-3xl p-7 space-y-5">
            <h4 className="text-lg font-bold text-primary">How it works</h4>
            {[
              { step: '1', icon: 'edit_note', text: 'Fill the form or message us on WhatsApp' },
              { step: '2', icon: 'call', text: 'We call to confirm your slot & requirements' },
              { step: '3', icon: 'home', text: 'Phlebotomist arrives at your doorstep' },
              { step: '4', icon: 'lab_research', text: 'Samples processed; report in 24 hours' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-sm">{s.icon}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-snug">{s.text}</p>
              </div>
            ))}
          </AnimatedReveal>

          {/* Call CTA */}
          <AnimatedReveal delay={0.5} className="bg-primary text-on-primary rounded-3xl p-7">
            <span className="material-symbols-outlined text-3xl mb-3 block">call</span>
            <h4 className="font-bold text-lg mb-1">Prefer to call?</h4>
            <p className="text-primary-fixed-dim text-sm mb-4">We're available 24/7 to take your request over the phone.</p>
            <a href="tel:02612277119" className="inline-block bg-white text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-fixed transition-all">
              0261-227-7119
            </a>
          </AnimatedReveal>

          {/* Appointment CTA */}
          <AnimatedReveal delay={0.55}>
            <Link href="/book" className="flex items-center gap-3 p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all group">
              <span className="material-symbols-outlined text-secondary">calendar_month</span>
              <div>
                <p className="text-sm font-bold text-primary">Prefer to visit us?</p>
                <p className="text-xs text-secondary group-hover:underline">Book a clinic appointment →</p>
              </div>
            </Link>
          </AnimatedReveal>
        </aside>
      </div>
    </div>
  );
}
