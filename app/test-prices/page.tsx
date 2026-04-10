import AnimatedReveal from '@/components/AnimatedReveal';
import Link from 'next/link';

export const metadata = {
  title: 'Test Prices & Packages | ATDC',
};

export default function TestPrices() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <AnimatedReveal className="mb-16">
        <span className="text-secondary font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-4 block">DIAGNOSTIC EXCELLENCE</span>
        <h1 className="text-[3.5rem] leading-[1.1] font-black text-primary tracking-tight max-w-3xl mb-6">
          Transparent Pricing, No Hidden Charges
        </h1>
        <p className="text-on-surface-variant body-lg max-w-2xl leading-relaxed text-lg">
          Empowering your health journey with clarity. Browse our comprehensive list of 170+ diagnostic tests and curated health packages designed for every need.
        </p>
      </AnimatedReveal>

      <section className="mb-24">
        <AnimatedReveal className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-extrabold text-primary mb-2">Popular Health Packages</h2>
            <p className="text-on-surface-variant">Recommended preventive screenings for you and your family.</p>
          </div>
        </AnimatedReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <AnimatedReveal delay={0.1} className="md:col-span-7 bg-primary-container rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="bg-secondary text-white text-[0.7rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full w-fit mb-6">BEST VALUE</div>
              <h3 className="text-3xl font-bold mb-4">Full Body Checkup</h3>
              <p className="text-primary-fixed-dim max-w-xs mb-8">Comprehensive assessment including Liver, Kidney, Lipid, and Complete Hemogram profiles.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black">₹2,499</span>
                <span className="text-primary-fixed-dim line-through opacity-60">₹4,999</span>
              </div>
            </div>
            <Link href="/book" className="relative z-10 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold w-fit hover:bg-white transition-colors duration-300 inline-block text-center">
              Book Now
            </Link>
            <div className="absolute -right-10 -bottom-10 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[12rem]">health_and_safety</span>
            </div>
          </AnimatedReveal>

          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            <AnimatedReveal delay={0.2} className="bg-surface-container-low rounded-[2rem] p-8 flex items-center justify-between group hover:bg-surface-container-high transition-colors h-full">
              <div>
                <h4 className="text-xl font-bold text-primary mb-1">Basic Blood Test</h4>
                <p className="text-2xl font-black text-secondary">₹699</p>
              </div>
              <Link href="/book" className="bg-white p-4 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition-all inline-flex items-center justify-center">
                <span className="material-symbols-outlined">add</span>
              </Link>
            </AnimatedReveal>
            <AnimatedReveal delay={0.3} className="bg-surface-container-low rounded-[2rem] p-8 flex items-center justify-between group hover:bg-surface-container-high transition-colors h-full">
              <div>
                <h4 className="text-xl font-bold text-primary mb-1">Diabetes Package</h4>
                <p className="text-2xl font-black text-secondary">₹799</p>
              </div>
              <Link href="/book" className="bg-white p-4 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition-all inline-flex items-center justify-center">
                <span className="material-symbols-outlined">add</span>
              </Link>
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.4} className="md:col-span-6 bg-surface-container-low rounded-[2rem] p-8 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-4xl text-secondary">bloodtype</span>
                <span className="text-2xl font-black text-primary">₹1,499</span>
              </div>
              <h4 className="text-2xl font-bold text-primary mb-2">Hemoglobin Panel</h4>
              <p className="text-on-surface-variant mb-6">In-depth analysis of iron levels, RBC indices, and peripheral smear examination.</p>
            </div>
            <Link href="/book" className="w-full py-4 border border-outline-variant rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-all block text-center">
              Book Now
            </Link>
          </AnimatedReveal>

          <AnimatedReveal delay={0.5} className="md:col-span-6 bg-surface-container-low rounded-[2rem] p-8 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-4xl text-secondary">thermostat</span>
                <span className="text-2xl font-black text-primary">₹999</span>
              </div>
              <h4 className="text-2xl font-bold text-primary mb-2">Fever Profile</h4>
              <p className="text-on-surface-variant mb-6">Rapid screening for Malaria, Typhoid, and Dengue with complete CBC analysis.</p>
            </div>
            <Link href="/book" className="w-full py-4 border border-outline-variant rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-all block text-center">
              Book Now
            </Link>
          </AnimatedReveal>
        </div>
      </section>

      <section className="bg-primary rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
        <AnimatedReveal>
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-[20rem]">science</span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-secondary mb-6">biotech</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Need a specialized test?</h2>
            <p className="text-primary-fixed-dim text-lg mb-10 text-balance leading-relaxed">
              We offer over 170+ standardized tests, diagnostics, and customized body checking panels. Contact our laboratories to inquire about specific testing protocols and we will accommodate your prescription.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-secondary text-primary-fixed px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors duration-300">
                Contact Laboratory
              </Link>
              <Link href="/book" className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold border border-primary-container hover:border-surface-container-high transition-colors duration-300">
                Book Appointment
              </Link>
            </div>
          </div>
        </AnimatedReveal>
      </section>
    </div>
  );
}
