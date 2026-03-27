import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Filter, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
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
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Activity,
      title: 'Automate what slows you down.',
      body: 'We map your repetitive processes (approvals, data entry, follow-ups, notifications) and build automations that run them without you.',
      tags: ['Internal Ops', 'Data Routing', 'Notifications', 'Approvals'],
    },
    {
      icon: Filter,
      title: 'Capture, qualify, and close, automatically.',
      body: 'AI chatbots, voice assistants, and smart follow-up sequences that turn inquiries into booked meetings while you focus on other things.',
      tags: ['AI Chatbots', 'Voice Assistants', 'Lead Qualification', 'Auto Follow-Up'],
    },
    {
      icon: Layers,
      title: 'Build the foundation. Then scale it.',
      body: 'Fast websites built to convert, integrated with the automations that support your growth from day one.',
      tags: ['Website Build', 'CRM Integration', 'Full-Stack Setup', 'Onboarding'],
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-void">
      <div className="content-width">
        <div className="mb-16 max-w-2xl">
          <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-4 block">
            WHAT WE BUILD
          </span>
          <h2 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.92] tracking-[-0.04em] text-text-1 mb-6">
            One agency. Every part of your business.
          </h2>
          <p className="font-sans text-[18px] leading-[1.7] text-text-2">
            We map your biggest time drains, build automations around them, and hand you the controls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-surface border border-border-color rounded-xl p-10 hover:border-signal hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
              >
                <div className="mb-8 text-signal/60">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-1 mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.7] text-text-2 mb-8 flex-grow">
                  {service.body}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="text-signal font-medium hover:text-[#00EEFF] transition-colors flex items-center gap-1 mt-auto"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
