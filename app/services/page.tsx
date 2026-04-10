import AnimatedReveal from '@/components/AnimatedReveal';
import Link from 'next/link';

export const metadata = {
  title: 'Departments & Services | ATDC',
};

export default function Services() {
  return (
    <>
      <section className="relative min-h-[614px] flex items-center overflow-hidden bg-primary px-6 py-20">
        <div className="absolute inset-0 opacity-20">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzS0qYwPBs6sZK4PGRLfFLcU1lF0h9AO-Xp1DPVVpRolGGrjP90RgZf729J8UdnL9b9RnYt54OdObWmRaqTXJhuB31YllXwUmwLfe00g3M_BqEh7WhJU3USyPGksKqLL6D0PvxeA6zwFG_l6rhJOIREV0qkS_Zw6FqGKIwR_B23qSFvxnw2_v08IRELuCYZZePTsT8cTDV7oTPltgXHpaU6Dm_KadGWnZMsZIxQctzSbofuqYJ-kPnw2iI-szjxKrA2GbeFPhSQ8cu" alt="Modern medical diagnostic laboratory" />
        </div>
        <AnimatedReveal className="max-w-7xl mx-auto w-full relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 text-secondary-container text-[0.75rem] font-bold tracking-widest uppercase mb-6 backdrop-blur-md">OUR SPECIALIZATIONS</span>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 max-w-3xl">
            Comprehensive Care Under One Roof
          </h1>
          <p className="text-on-primary-container text-lg md:text-xl max-w-2xl leading-relaxed">
            Experience world-class diagnostic precision with our integrated medical departments, powered by advanced technology and expert clinical oversight.
          </p>
        </AnimatedReveal>
      </section>

      <section className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Pathology Lab', icon: 'magnification_small', link: '#', desc: 'NABL accredited laboratory offering full-spectrum blood chemistry, microbiology, and molecular diagnostics with rapid turnaround times.' },
              { title: 'X-Ray & Radiology', icon: 'radiology', link: '#', desc: 'High-frequency digital X-ray imaging for precise skeletal and internal visualization with minimal radiation exposure for patients.' },
              { title: 'Sonography', icon: 'waves', link: '#', desc: 'Advanced 3D/4D ultrasound imaging for prenatal care, abdominal scans, and vascular doppler studies conducted by expert radiologists.' },
              { title: 'Dental Care', icon: 'dentistry', link: '#', desc: 'Comprehensive oral health services including cosmetic dentistry, root canal treatments, and pediatric dental surgery in a sterile environment.' },
              { title: 'Homeopathy', icon: 'energy_savings_leaf', link: '#', desc: 'Holistic treatment approaches for chronic ailments, lifestyle diseases, and long-term wellness plans using gentle, effective natural remedies.' },
              { title: 'ECG', icon: 'monitor_heart', link: '#', desc: 'High-precision electrocardiograms for cardiac screening and monitoring, interpreted by senior cardiologists to ensure heart health.' }
            ].map((srv, i) => (
              <AnimatedReveal key={i} delay={i * 0.1} className="bg-surface-container-lowest p-10 rounded-xl group hover:bg-primary transition-all duration-500 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-secondary-container/10 flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-secondary text-3xl group-hover:text-primary">{srv.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-white">{srv.title}</h3>
                <p className="text-on-surface-variant group-hover:text-on-primary-container/80 leading-relaxed mb-6">
                  {srv.desc}
                </p>
                <a className="inline-flex items-center gap-2 text-secondary font-bold group-hover:text-tertiary-fixed transition-colors" href={srv.link}>
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-24 mt-12">
        <AnimatedReveal className="bg-secondary relative rounded-xl overflow-hidden min-h-[400px] flex items-center px-12 py-16">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-30 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPdcE4uCq0RtK5DEpIs7cWp7I3wD1tc5DLkbpUnsjPcXjoHDyRliDb7uhlboCajWmQBvNRnm8IlfQzYPzSe_EkNZqd1LTq1DiCQg7PFAMh3oltma72JBtFTO6UZd0B9kafrt3DtRzEfeH5PoDxMZefL7_c7Pp_s4OlcloKs5mYGsrqlWS91BeMlkt7IQ4zYc8h87fy4NZkTB8Tq_4pLNYwwy7Qa6SFq9VJCZwJJbl6SKfviy0lA3iwQ7Mlopj4kxBlRz8TL4NsNEpK" alt="Home collection courier" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-tertiary-fixed mb-4">
              <span className="material-symbols-outlined">house</span>
              <span className="text-sm font-bold tracking-widest uppercase">CONVENIENCE AT YOUR DOORSTEP</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-black mb-6 leading-tight">Home Sample Collection</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Don't let the commute stop your health check-up. Our certified phlebotomists come to your home for blood and urine sample collection at no extra charge.
            </p>
            <AnimatedReveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-white text-secondary px-8 py-4 rounded-xl font-bold hover:bg-secondary-fixed transition-colors flex items-center justify-center">Book a Collection</Link>
                <Link href="/test-prices" className="bg-secondary-container/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold backdrop-blur-sm flex items-center justify-center">View Sample Packages</Link>
              </div>
            </AnimatedReveal>
          </div>
        </AnimatedReveal>
      </section>
    </>
  );
}
