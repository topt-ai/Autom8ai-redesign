import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Bot, MessageCircle, Phone, Smartphone, UserCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LiveSystems() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const systems = [
    {
      tag: 'LEAD & CLIENT SYSTEMS',
      title: 'Real Estate Lead Qualifier',
      body: 'An AI that qualifies incoming leads, asks the right questions, and books showings automatically. No agent needed until the lead is ready.',
      stats: ['< 2 min response', '24/7 active', 'CRM integrated'],
      mockup: <RealEstateMockup />,
    },
    {
      tag: 'LEAD & CLIENT SYSTEMS',
      title: 'Smile Preview & Booking Bot',
      body: 'Patients upload a selfie, get an AI-generated smile preview, and book a consultation — all without calling the clinic.',
      stats: ['AI-generated previews', 'WhatsApp booking', 'Zero staff needed'],
      mockup: <DentalMockup />,
    },
  ];

  return (
    <section id="live-systems" ref={sectionRef} className="section-padding bg-void">
      <div className="content-width">
        <div className="mb-16 max-w-2xl">
          <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-4 block">
            BUILT & RUNNING
          </span>
          <h2 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.92] tracking-[-0.04em] text-text-1 mb-6">
            Not demos. Live systems.
          </h2>
          <p className="font-sans text-[18px] leading-[1.7] text-text-2">
            These are real automations we've built. Try them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {systems.map((system, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-surface border border-border-color rounded-xl overflow-hidden flex flex-col relative"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-signal" />

              <div className="p-8 flex-grow flex flex-col">
                <span className="text-signal uppercase text-[12px] font-medium tracking-[0.08em] mb-4 block">
                  {system.tag}
                </span>
                <h3 className="font-display font-bold text-[28px] leading-tight text-text-1 mb-4">
                  {system.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.7] text-text-2 mb-8 flex-grow">
                  {system.body}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                  {system.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2 text-text-3 text-[14px] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-signal/50" />
                      {stat}
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 border border-signal text-signal px-6 py-3 rounded-md font-medium hover:bg-signal hover:text-void transition-colors duration-200 w-fit"
                >
                  Try Live System <ArrowRight size={18} />
                </a>
              </div>

              {/* Mockup Area */}
              <div className="bg-surface-2 border-t border-border-color p-6 h-[240px] flex items-center justify-center relative overflow-hidden">
                {system.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealEstateMockup() {
  return (
    <div className="w-full max-w-[320px] bg-void border border-border-color rounded-lg p-4 shadow-xl relative z-10">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-color">
        <div className="w-8 h-8 rounded-full bg-signal/10 flex items-center justify-center text-signal">
          <Bot size={16} />
        </div>
        <div>
          <div className="text-text-1 text-sm font-medium">Property Assistant</div>
          <div className="text-signal text-[10px] uppercase tracking-wider">Online</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-surface-2 text-text-2 text-xs p-3 rounded-r-lg rounded-bl-lg max-w-[85%]">
          Hi! I see you're interested in the 3BR on Maple St. Are you looking to move in the next 30 days?
        </div>
        <div className="bg-signal text-void text-xs p-3 rounded-l-lg rounded-br-lg max-w-[85%] ml-auto">
          Yes, ideally by the 15th.
        </div>
        <div className="bg-surface-2 text-text-2 text-xs p-3 rounded-r-lg rounded-bl-lg max-w-[85%] flex items-center gap-2">
          <UserCheck size={14} className="text-signal" /> Great. I've pre-qualified you. Let's book a showing.
        </div>
      </div>
    </div>
  );
}

function DentalMockup() {
  return (
    <div className="w-full max-w-[320px] bg-void border border-border-color rounded-lg p-4 shadow-xl relative z-10">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-color">
        <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
          <MessageCircle size={16} />
        </div>
        <div>
          <div className="text-text-1 text-sm font-medium">Smile Clinic Bot</div>
          <div className="text-text-3 text-[10px] uppercase tracking-wider">WhatsApp</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-surface-2 text-text-2 text-xs p-3 rounded-r-lg rounded-bl-lg max-w-[85%]">
          Upload a quick selfie and our AI will generate your new smile preview in seconds! 📸✨
        </div>
        <div className="bg-[#25D366] text-void text-xs p-3 rounded-l-lg rounded-br-lg max-w-[85%] ml-auto flex items-center gap-2">
          <Smartphone size={14} /> [Image Uploaded]
        </div>
        <div className="bg-surface-2 text-text-2 text-xs p-3 rounded-r-lg rounded-bl-lg max-w-[85%]">
          Generating preview... 🔄
        </div>
      </div>
    </div>
  );
}
