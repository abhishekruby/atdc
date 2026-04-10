import AnimatedReveal from '@/components/AnimatedReveal';
import Link from 'next/link';

export const metadata = {
  title: 'Meet Our Specialists | ATDC',
};

export default function Doctors() {
  const doctors = [
    {
      specialty: 'Homeopathy Specialist',
      name: 'Dr. Jagruti J Shah',
      desc: 'Over 15 years of experience in constitutional homeopathic treatment and chronic care.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=500'
    },
    {
      specialty: 'Consultant Radiologist',
      name: 'Dr. Nilesh Patel',
      desc: 'Expert in advanced MRI and CT imaging with a focus on neuroradiology and oncology.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500'
    },
    {
      specialty: 'Clinical Pathologist',
      name: 'Dr. Ananya Mehta',
      desc: 'Leading the laboratory medicine wing with precision and ethical diagnostic standards.',
      img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400&h=500'
    },
    {
      specialty: 'Orthodontic Surgeon',
      name: 'Dr. Rohan Deshmukh',
      desc: 'Specialized in complex dental surgeries and pediatric orthodontics for over a decade.',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500'
    },
    {
      specialty: 'Interventional Cardiology',
      name: 'Dr. Vikram Sarabhai',
      desc: 'Committed to cardiovascular wellness and prevention through advanced screening.',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=500'
    },
    {
      specialty: 'General Wellness',
      name: 'Dr. Priyanka Chopra',
      desc: 'Holistic approach to family medicine and preventive healthcare screenings.',
      img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400&h=500'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <AnimatedReveal className="mb-16">
        <span className="label-md uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Medical Expertise</span>
        <h1 className="text-[3.5rem] font-black text-primary leading-none tracking-tight mb-6">Meet Our Specialists</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Our team of highly qualified diagnostic experts and clinicians are dedicated to providing the most precise medical insights for your health journey.
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.1} className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm transition-all">All Departments</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all">Homeopathy</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all">Pathology</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all">Radiology</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all">Dental</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all">Cardiology</button>
        </div>
      </AnimatedReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc, i) => (
          <AnimatedReveal key={i} delay={0.2 + (i * 0.1)} className="group relative bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-[0px_12px_32px_rgba(0,16,62,0.04)] transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img alt={doc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={doc.img} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">{doc.specialty}</span>
              <h3 className="text-2xl font-bold text-primary mb-2">{doc.name}</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{doc.desc}</p>
              <Link href="/book" className="w-full bg-surface-container-low text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                Book with Doctor
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </div>
  );
}
