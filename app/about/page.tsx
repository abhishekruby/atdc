import AnimatedReveal from '@/components/AnimatedReveal';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | ATDC',
};

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <AnimatedReveal className="lg:col-span-7 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">Established 1997</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tighter leading-[1.1] mb-8">
              Surat's Trusted <br />
              <span className="text-secondary">Diagnostic Partner</span> <br />
              Since 1997
            </h1>
            <p className="text-on-surface-variant max-w-xl leading-relaxed mb-10 text-lg">
              Managed by the visionaries at <span className="font-semibold text-primary">Terapanth Yuvak Parishad, Udhna</span>, Acharya Tulsi Diagnostic Centre (ATDC) has been the cornerstone of medical precision in South Gujarat for over two decades.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-surface-container-low px-6 py-4 rounded-xl">
                <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                <div>
                  <p className="text-sm font-bold text-primary">NABL Accredited</p>
                  <p className="text-xs text-on-surface-variant">Quality Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-6 py-4 rounded-xl">
                <span className="material-symbols-outlined text-secondary text-3xl">groups</span>
                <div>
                  <p className="text-sm font-bold text-primary">5M+ Patients</p>
                  <p className="text-xs text-on-surface-variant">Trusted by Surat</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2} className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
              <img alt="Modern Laboratory" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvy0x0BDQSe-07RDx-gD6s_GHftmh5u0HXOX1r9DYKnu_4UR9tuNVni0aEeLkhx8UVBO5SM9P929ijLBTGuo_btqFHQ4uAsQrTj5WqFshO9cYuecInBFMHpJVYvgkvj1AeQ_4r0avPujzklv5x5G2cSUXA9SrjcicpihYm5eDVjPQAZsudsUkkIenYtqaij6iJEvukAtb-3Afh5ledzcA2ksjctykconWXqCp6lbhrJCPIOAnHi-dUk9U9JQRyLH-G9HGIi4Nc7oOc" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl max-w-[240px] hidden md:block">
              <p className="text-primary font-bold italic text-lg leading-snug">"Precision in every test, Care in every interaction."</p>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedReveal className="relative bg-primary rounded-[3rem] p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Our Core Mission</h2>
                <p className="text-xl md:text-2xl text-primary-fixed-dim leading-relaxed font-light">
                  "To make world-class diagnostics accessible to every family by combining cutting-edge technology with unwavering ethical standards and compassionate service."
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2">Transparency</h3>
                  <p className="text-primary-fixed text-sm">Clear pricing and clinical reports with no hidden complexities.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2">Social Responsibility</h3>
                  <p className="text-primary-fixed text-sm">Community-driven healthcare managed by Terapanth Yuvak Parishad.</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedReveal className="mb-16">
            <h2 className="text-4xl font-black text-primary tracking-tighter mb-4">The Values We Live By</h2>
            <p className="text-on-surface-variant max-w-2xl">Rooted in heritage, powered by innovation. Our values define how we treat every specimen and every soul.</p>
          </AnimatedReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'biotech', title: 'Accuracy', desc: 'Zero-compromise precision utilizing high-end automated systems from Roche, Siemens, and Abbott. Every result is double-validated by expert pathologists.' },
              { icon: 'location_on', title: 'Accessibility', desc: 'With multiple branches across Surat including Udhna, Pandesara, and Bhestan, we bring professional diagnostics to your doorstep.' },
              { icon: 'favorite', title: 'Compassion', desc: 'Diagnostics can be stressful. Our staff is trained to provide a comforting environment, making your health journey smoother and more human.' }
            ].map((v, i) => (
              <AnimatedReveal key={i} delay={i * 0.15} className="group bg-surface-container-lowest p-10 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-outline-variant/15">
                <div className="w-16 h-16 bg-secondary-container/30 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-4xl">{v.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{v.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{v.desc}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedReveal className="text-center mb-20">
            <h2 className="text-4xl font-black text-primary tracking-tighter">Our Journey Through Time</h2>
          </AnimatedReveal>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-outline-variant/30 hidden md:block"></div>
            <div className="space-y-20">
              {[
                { year: '1997', title: 'The Foundation', pos: 'right', desc: 'Inception of ATDC at Udhna by Terapanth Yuvak Parishad with a vision to serve the underprivileged with high-quality healthcare.' },
                { year: '2010', title: 'Modernization Leap', pos: 'left', desc: 'Introduction of full automation in biochemistry and hematology. Expanded our reach to Pandesara branch.' },
                { year: 'Present', title: 'A Digital Health Ecosystem', pos: 'right', desc: 'Expanding to 5 major locations in Surat with online report access and home collection services, maintaining 99.9% accuracy.' }
              ].map((t, i) => (
                <AnimatedReveal key={i} delay={0.2} className={`relative flex flex-col md:flex-row${t.pos === 'left' ? '-reverse' : ''} items-center justify-between`}>
                  <div className={`md:w-[45%] mb-8 md:mb-0 text-${t.pos}`}>
                    <h4 className="text-4xl font-black text-secondary mb-2">{t.year}</h4>
                    <h5 className="text-xl font-bold text-primary mb-3">{t.title}</h5>
                    <p className="text-on-surface-variant">{t.desc}</p>
                  </div>
                  <div className="z-10 w-12 h-12 bg-primary rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-[45%] hidden md:block"></div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedReveal className="flex flex-col md:flex-row items-center gap-12 bg-surface-container-high rounded-[3rem] p-12 md:p-16 border border-outline-variant/10">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter mb-6">Ready to prioritize your health?</h2>
              <p className="text-on-surface-variant text-lg mb-8">Schedule a home collection or visit one of our 5 specialized centers across Surat for an effortless diagnostic experience.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/book" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center">Book Now</Link>
                <Link href="/test-prices" className="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center">View All Tests</Link>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img alt="Doctor Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8LTjmAhBPKHxDanlPVVbWJ4HiKRz-N7wn3Vo-XiPk9eKp0E9ySOInnzdl6jsiE3iayriGzG5NLV-LV0R_xgXMi6kuLG0WPP-jb_ROGmNFuLeC2wV4knL6JNMfAFV9zfd-QUygrJ5LmWbfWS6nMz0BW769mjMVMUR_Tzc6ejb4vB3GC-7oOkLgse7o_l9LuUOQcEah6jV98czJsRkl74c3-QOSNnv2keT21OHJVyQ483C8pTxx_ESQfpuS8u6787Dp60K__Br6--tq" />
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
