import AnimatedReveal from '@/components/AnimatedReveal';

export const metadata = {
  title: 'Contact Us | ATDC',
};

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Header */}
      <AnimatedReveal className="mb-16">
        <span className="label-md text-secondary font-bold tracking-[0.2em] uppercase mb-4 block">Reach Out to Excellence</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tight font-headline mb-6">Get in Touch</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Connect with our expert diagnostic team. Whether you have a query about a test, need guidance on reports, or want to schedule a home collection, we are here for you across 5 strategic locations in Surat.
        </p>
      </AnimatedReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Form */}
        <AnimatedReveal delay={0.1} className="lg:col-span-5 bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-[0px_12px_32px_rgba(0,16,62,0.04)]">
          <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Full Name</label>
                <input className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Email Address</label>
                <input className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Subject</label>
                <select className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface outline-none">
                  <option>Test Inquiry</option>
                  <option>Home Collection</option>
                  <option>Report Assistance</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Message</label>
                <textarea className="w-full px-6 py-4 rounded-xl bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline-variant outline-none" placeholder="How can we help you today?" rows={5}></textarea>
              </div>
            </div>
            <button className="w-full bg-primary text-on-primary py-5 rounded-xl font-bold text-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 group" type="button">
              Send Message
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
            </button>
          </form>
        </AnimatedReveal>

        {/* Right: Branch Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Location Tabs/Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Branch Card 1 */}
            <AnimatedReveal delay={0.2} className="group bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                <img alt="Udhna Branch" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcUPDlJvHhJSem4nEVdp5W-Dcq4oDJ7omQDpO1vmZW50IpV7jVfnsFbu_MoyQOlINpPI0DEBWLxIdt0YOAMU5OUMNtOXAvNOJU25nm8fDtB5bw__fTaPOtV8Pa1ogTSXyiQvA9Z0gMTNkAo0F68ubpCuXJ9F6Jf82wvIbyVAFLu5jiYEDoRbIGIxFOyfEiM2QsHkhxgH7j19zKvriff0LWFvI0mp37-MkOz0tJepifjXwaYIYXbdPTiNOMmcoVwY8At7pNMOFKu5kZ" />
              </div>
              <div className="flex-grow space-y-2 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-primary">Udhna (Main Branch)</h3>
                    <p className="text-on-surface-variant text-sm">Near Railway Station, Udhna Main Rd, Surat</p>
                  </div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">H.O.</span>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1 text-sm text-secondary font-medium">
                    <span className="material-symbols-outlined text-base">call</span> +91 98765 43210
                  </div>
                  <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">schedule</span> 24/7 Service
                  </div>
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Udhna+Main+Road+Surat" className="w-full md:w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all group/btn">
                  <span className="material-symbols-outlined">map</span>
                </a>
              </div>
            </AnimatedReveal>

            {/* Branch Card 2 */}
            <AnimatedReveal delay={0.3} className="group bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                <img alt="Pandesara Branch" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABXshvYt__CxRtWp9u7U9-t98qxLlTuR0A_fFgsWfB6-Vm7j3k6wVkK3mN3Phn2g8hg1OI7A6ef9BAF6dA1MGYxroLwOZBfBsg-abgzWovHzxg5udE1nSVhkawDE-S5L7tnBOFfoKzHGSQTndb7SW62MWOIrXcrLQo2nyGwhtysx1JwD0nohbuY1qdXwODVzVJm-u3RW0T8D00mlI_c6tY19OYN-Fakntoh5llUVtwgXbq-LL0H5ddi3bVDbZGUUK1yKuAGKNtm6Mv" />
              </div>
              <div className="flex-grow space-y-2 w-full">
                <h3 className="text-xl font-bold text-primary">Pandesara</h3>
                <p className="text-on-surface-variant text-sm">GIDC Industrial Estate, Near Fire Station, Pandesara</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1 text-sm text-secondary font-medium">
                    <span className="material-symbols-outlined text-base">call</span> +91 98765 43211
                  </div>
                  <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">schedule</span> 08:00 AM - 09:00 PM
                  </div>
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Pandesara+Surat" className="w-full md:w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">map</span>
                </a>
              </div>
            </AnimatedReveal>

            {/* Branch Cards Grid (Smallers) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bhestan */}
              <AnimatedReveal delay={0.4} className="p-8 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-high transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">Bhestan</h3>
                  <p className="text-sm text-on-surface-variant mb-4">Near Bhestan Crossroads, Main Road</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">call</span> +91 98765 43212
                  </div>
                  <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Bhestan+Surat" className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform w-fit">
                    View on Map <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </AnimatedReveal>

              {/* Sachin */}
              <AnimatedReveal delay={0.5} className="p-8 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-high transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">Sachin</h3>
                  <p className="text-sm text-on-surface-variant mb-4">Industrial Hub Area, Opp. Market Yard</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">call</span> +91 98765 43213
                  </div>
                  <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Sachin+Surat" className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform w-fit">
                    View on Map <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </AnimatedReveal>

              {/* Godadara */}
              <AnimatedReveal delay={0.6} className="p-8 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-high transition-all md:col-span-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Godadara</h3>
                    <p className="text-sm text-on-surface-variant">Shyam Dham Society Area, Godadara Road</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
                      <span className="material-symbols-outlined text-base">call</span> +91 98765 43214
                    </div>
                    <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Godadara+Surat" className="bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-fixed-dim transition-all inline-block w-fit text-center">
                      Get Directions
                    </a>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </div>

          {/* Global Map Integration Placeholder */}
          <AnimatedReveal delay={0.7} className="w-full h-80 rounded-[2rem] overflow-hidden relative group">
            <img alt="Map of Surat" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT-fFZ9xjZXddpcfPat-JpQBhhaFnqKbVzLosjfXI0lj_Tjdo2ZVy9CjQvRz0gebv29zUV-hM0941-Aq-Vr5WtU6M3da1_zmAnX3zls3CwOSyr2H1Q6Yq4Mj0gqc761QMFj5O7MayjM1JBXZwv7qC4PU41-fwmsV2_wRAQVgdpx3wHRmv6O9faahsbrM6w2f5BI5GfwYvEd8x3D2aOszD7BaRTyBmdjzBMYEYH_cdJbmhNIlj_NSXSiRaVxZJdFC2iZvuwHEnx0ZYO" />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Surat" className="bg-white text-primary px-8 py-3 rounded-xl font-bold shadow-xl flex items-center gap-2 hover:bg-surface-container-high transition-colors text-center w-fit">
                <span className="material-symbols-outlined">map</span>
                Explore Branches Interactive Map
              </a>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  );
}
