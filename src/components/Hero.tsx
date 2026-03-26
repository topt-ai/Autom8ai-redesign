import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Check, Loader2, Mail, MessageSquare, UserPlus } from 'lucide-react';

const ROTATING_WORDS = ['business.', 'operations.', 'growth.', 'future.'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.animate-fade-up', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.1
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordRef.current) {
        gsap.fromTo(
          wordRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [wordIndex]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,232,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="content-width w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-20 relative z-10">
        {/* Left Copy Stack */}
        <div className="lg:col-span-7 flex flex-col items-start animate-fade-up">
          <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-6">
            AI Automation Agency
          </span>

          <h1 className="font-display font-extrabold text-[clamp(52px,8vw,96px)] leading-[0.92] tracking-[-0.04em] text-text-1 mb-6">
            We build the systems.<br />
            You run the <span ref={wordRef} className="text-signal inline-block">{ROTATING_WORDS[wordIndex]}</span>
          </h1>

          <p className="font-sans text-[18px] leading-[1.7] text-text-2 max-w-[520px] mb-10">
            Done-for-you AI automations that cut busy work, qualify leads,
            and keep your business running — without you babysitting it.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-signal text-void font-bold px-9 py-4 rounded-md hover:bg-[#00EEFF] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Book a Free Call <ArrowRight size={18} />
            </a>
            <a
              href="#live-systems"
              className="w-full sm:w-auto text-text-2 font-medium hover:text-signal transition-colors flex items-center justify-center"
            >
              See Live Systems
            </a>
          </div>

          <p className="text-text-3 text-[13px]">
            Trusted by clinics, agencies, real estate firms, and more.
          </p>
        </div>

        {/* Right Automation Preview Widget */}
        <div className="lg:col-span-5 w-full max-w-[480px] mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <AutomationWidget />
        </div>
      </div>
    </section>
  );
}

function AutomationWidget() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nodes = [
    { label: 'New Lead Received', icon: UserPlus },
    { label: 'Qualify with AI', icon: Loader2, spin: true },
    { label: 'Send Personalized Email', icon: Mail },
    { label: 'Book Meeting', icon: MessageSquare },
    { label: 'Notify Team', icon: Check },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nodes.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div className="bg-surface border border-border-color rounded-xl p-7 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="live-dot" />
        <span className="text-text-1 font-medium text-sm tracking-wide uppercase">Workflow Running</span>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Connecting Line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-px border-l border-dashed border-border-hi" />

        {nodes.map((node, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          const Icon = node.icon;

          return (
            <div
              key={i}
              className={`relative flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-surface-2 border-l-2 border-signal translate-x-1' : 'bg-transparent border-l-2 border-transparent'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                  isActive ? 'bg-signal/20 text-signal' : isPast ? 'bg-surface-2 text-text-2' : 'bg-void border border-border-color text-text-3'
                }`}
              >
                <Icon size={18} className={isActive && node.spin ? 'animate-spin' : ''} />
              </div>
              <span
                className={`font-medium text-sm transition-colors duration-300 ${
                  isActive ? 'text-signal' : isPast ? 'text-text-1' : 'text-text-3'
                }`}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
