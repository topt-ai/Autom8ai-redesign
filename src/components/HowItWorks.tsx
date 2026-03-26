import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line width
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // Fade up steps
      gsap.fromTo(
        stepsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      body: 'We spend 30 minutes understanding your operations, bottlenecks, and goals.',
    },
    {
      num: '02',
      title: 'MAP',
      body: 'We build a custom automation plan for your business and send it to you — free.',
    },
    {
      num: '03',
      title: 'BUILD',
      body: 'Our team builds and tests the full system. You see it before we ship anything.',
    },
    {
      num: '04',
      title: 'HAND OFF',
      body: "We deploy, train, and stay available. Your system runs. You don't babysit it.",
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-void relative">
      <div className="content-width">
        <div className="mb-20">
          <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-4 block">
            THE PROCESS
          </span>
          <h2 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.92] tracking-[-0.04em] text-text-1">
            Four steps from intro call to running system.
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line Background */}
          <div className="hidden lg:block absolute top-[32px] left-[40px] right-[40px] h-px bg-border-color z-0" />
          
          {/* Desktop Connecting Line Fill */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[32px] left-[40px] right-[40px] h-px bg-signal z-0 origin-left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="flex flex-col lg:items-start"
              >
                <div className="font-display font-extrabold text-[64px] leading-none text-signal mb-6 bg-void inline-block pr-4">
                  {step.num}
                </div>
                <h3 className="font-sans font-semibold text-[18px] text-text-1 mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.7] text-text-2">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
