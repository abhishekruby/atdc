import AnimatedReveal from '../components/AnimatedReveal';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <AnimatedReveal className="space-y-8">
            <span className="label-md uppercase tracking-widest text-secondary font-bold">Trusted Since 1997</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight">
              Your Health Deserves the <span className="text-secondary">Best Diagnosis</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">
              With over 7.5 Lakh+ patients served across Surat, we combine cutting-edge technology with compassionate care for precision results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-secondary/20 transition-all flex items-center justify-center gap-2">
                Book Appointment
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/test-prices" className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center">
                View Test Prices
              </Link>
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2} className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-1 md:rotate-3">
              <img alt="Laboratory" className="w-full h-full object-cover aspect-[4/3]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPMCHxtR-hNWs22lICLg8gTvpkU-9UUt6JyFDf2dOJ4mkQuu6_SSJ6MK71r_uTpSv5tPVeGp1E2WrrZ-rWH67vddssEbyOlcyg2NodFmAHHKs1-kDzSzyuMYSgFoork5BfHgJVHZXPBzUpRjXhXQYxbs0HY7lAsTgnS7pcvl_l9SvcKr0O5N5chmWCUxAU44Dec0ffbVCSmCafta6xROr1W10wY-0aI36Y2RYeVlvIzElsjNUytZ97Rrf9N6kgWxK5Xc8wk-0gicUV" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden lg:block border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-container/30 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">NABL Accredited</p>
                  <p className="text-sm font-black text-primary">ISO Certified Lab</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </header>

      {/* Stats Bar */}
      <AnimatedReveal delay={0.4} className="max-w-7xl mx-auto px-6 -mt-12 mb-20 relative z-20">
        <div className="bg-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-wrap justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-4xl font-black text-secondary-container">27+</p>
            <p className="text-sm font-medium text-primary-fixed opacity-70">Years of Experience</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-black text-secondary-container">7,50,000+</p>
            <p className="text-sm font-medium text-primary-fixed opacity-70">Patients Served</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-black text-secondary-container">29</p>
            <p className="text-sm font-medium text-primary-fixed opacity-70">Expert Doctors</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-black text-secondary-container">8</p>
            <p className="text-sm font-medium text-primary-fixed opacity-70">Departments</p>
          </div>
        </div>
      </AnimatedReveal>

      {/* About Snippet */}
      <section className="py-20 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <AnimatedReveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img alt="Clinic Interior" className="rounded-2xl mt-8 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNqsZH6v3U-ZEuUzM40n2hT35DUf_d9t6yX453GJ3QWUYxLOYUEqMO5uCQRQtBRQIyKdAgV6_BP-qubkMEz0npRcN7CtzDtwvlypYVtjrO0BkKZe6FHTaQZOLftG9_h5g64O8fy-BdOuwCACQx69rIjBr6A-Xs7WGoGqJbbbh4YSHhHLLC3p3KhtNu93qoOGl83Eu4AL5WIcfBuhYqm58R0AoglvgOSUHJLoWQM59FN3l9pKin6gg_lWySFyZuVTjmBC4c8rjiVg5T" />
              <img alt="Patient Care" className="rounded-2xl shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrpIY0i5e6gBn-bGkvyKnQbFM-iwBcKy4HVmlyIvLGLHB6w_QaTr2agqq2IZ0O5Zw-5R-rcC5TOw17FG3QQ5_TMkFr41qRQOOEBODP6Qz38Gi7sigKIm-Q1j__tyGN879BRk_PsQlYtC8ddIIJdr74XXmdn8JgSYKkJQC_UET8BMTWbAXuwhMInxyDWxBvY98ESNmnjlVLmi8hSIw3icxISiFPC5CERUDLl2fUXXKaZPOqWqrA1QRayQ-z4MNKTb62Bxk8jbZAcuKb" />
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2} className="space-y-6">
            <h2 className="text-4xl font-bold text-primary tracking-tight">Surat's Trusted Diagnostic Partner Since 1997</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Acharya Tulsi Diagnostic Centre (ATDC) has been a pioneer in medical diagnostics for nearly three decades. We believe in providing accurate results that empower doctors and patients to make informed health decisions.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="font-semibold">NABL Accredited</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="font-semibold">Expert Radiologists</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="font-semibold">Advanced MRI/CT</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <p className="font-semibold">Fast Turnaround</p>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedReveal className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold text-primary">Comprehensive Diagnostic Services</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">From routine blood tests to high-end imaging, we offer a complete range of diagnostic solutions under one roof.</p>
        </AnimatedReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "biotech", title: "Pathology", desc: "Full range of clinical pathology, biochemistry, and microbiology tests with certified lab experts." },
            { icon: "radiology", title: "Radiology", desc: "Advanced X-Ray and imaging technology for clear, detailed anatomical insights." },
            { icon: "monitor_heart", title: "Sonography", desc: "High-resolution ultrasound imaging for abdominal, obstetric, and cardiac evaluations." },
            { icon: "neurology", title: "Specialized", desc: "Including MRI, CT scans, and high-end molecular diagnostics for complex cases." }
          ].map((s, i) => (
            <AnimatedReveal key={i} delay={i * 0.1} className="bg-surface-container-lowest p-8 rounded-3xl group hover:bg-primary hover:text-white transition-all duration-500 shadow-sm border border-outline-variant/10">
              <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-3xl">{s.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-on-surface-variant group-hover:text-white/80 text-sm leading-relaxed">{s.desc}</p>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <AnimatedReveal className="lg:col-span-1 space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tight">Why Patients Trust ATDC</h2>
              <p className="text-primary-fixed opacity-80 leading-relaxed">We combine medical excellence with patient-centric services to ensure a stress-free diagnostic experience.</p>
              <Link href="/about" className="inline-flex text-secondary-fixed font-bold items-center gap-2 hover:gap-4 transition-all w-fit">
                Learn More About Us
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </AnimatedReveal>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: "currency_rupee", title: "Affordable", desc: "Quality diagnosis accessible to everyone without compromising on precision." },
                { icon: "bolt", title: "Fast Reports", desc: "Industry-leading turnaround time with digital report delivery same-day." },
                { icon: "home_health", title: "Home Collection", desc: "Professional phlebotomists visiting your doorstep for convenient testing." },
                { icon: "chat", title: "WhatsApp Reports", desc: "Get your medical reports directly on your mobile for instant access." }
              ].map((w, i) => (
                <AnimatedReveal key={i} delay={0.2 + (i * 0.1)} className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed">{w.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{w.title}</h4>
                    <p className="text-sm text-primary-fixed opacity-70">{w.desc}</p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedReveal className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-primary">Popular Health Packages</h2>
              <p className="text-on-surface-variant">Preventive health checks designed for your lifestyle.</p>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </AnimatedReveal>
          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
            {[
              { tag: "Best Seller", tagClass: "bg-secondary-fixed text-on-secondary-fixed-variant", title: "Basic Executive", params: "35 Essential Health Parameters", checks: ["CBC & ESR", "Fasting Blood Sugar", "Lipid Profile"], oldPrice: "₹1,500", newPrice: "₹899" },
              { tag: "Recommended", tagClass: "bg-surface-container-high text-on-surface-variant", title: "Women Wellness", params: "48 Vital Parameters for Her", checks: ["Thyroid Profile", "Vitamin D & B12", "Calcium Levels"], oldPrice: "₹4,200", newPrice: "₹2,499" },
              { tag: "Premium", tagClass: "bg-tertiary-fixed text-on-tertiary-fixed", title: "Senior Citizen", params: "60+ Comprehensive Parameters", checks: ["Kidney Function", "Liver Function", "HbA1c"], oldPrice: "₹5,500", newPrice: "₹3,299" },
            ].map((pkg, i) => (
              <AnimatedReveal key={i} delay={i * 0.1} className="min-w-[320px] bg-white rounded-3xl p-8 snap-start border border-outline-variant/10 shadow-sm hover:shadow-xl transition-shadow flex-shrink-0">
                <div className={`${pkg.tagClass} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block mb-4`}>{pkg.tag}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{pkg.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{pkg.params}</p>
                <ul className="space-y-3 mb-8 text-sm">
                  {pkg.checks.map((chk, j) => (
                    <li key={j} className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">check</span> {chk}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-6 border-t border-surface-variant">
                  <div>
                    <p className="text-sm text-slate-400 line-through">{pkg.oldPrice}</p>
                    <p className="text-2xl font-black text-primary">{pkg.newPrice}</p>
                  </div>
                  <Link href="/book" className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-secondary transition-colors flex items-center justify-center">Book Now</Link>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedReveal>
            <h2 className="text-4xl font-extrabold text-primary text-center mb-16 tracking-tight">Common Questions</h2>
          </AnimatedReveal>
          <div className="space-y-4">
            {[
              { q: "How can I book a home collection?", a: "You can book a home collection by calling our branch nearest to you or via our WhatsApp service. Our certified phlebotomists will visit at your preferred time." },
              { q: "When will I receive my reports?", a: "Most routine pathology reports are ready within 6-12 hours. Specialized scans or complex tests may take 24-48 hours. Reports are sent via WhatsApp and Email." },
              { q: "Do I need a doctor's prescription?", a: "For preventive health packages, no prescription is required. However, for specialized radiology or invasive tests, a valid medical prescription is mandatory." }
            ].map((faq, i) => (
              <AnimatedReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none outline-none">
                      <span className="text-lg font-bold text-primary">{faq.q}</span>
                      <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>
                    <p className="mt-4 text-on-surface-variant leading-relaxed">{faq.a}</p>
                  </details>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
