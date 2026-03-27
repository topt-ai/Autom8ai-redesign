import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setHasAnimated(true),
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 10, suffix: '+', label: 'Hours saved', subLabel: 'per client' },
    { value: 200, suffix: '+', label: 'Tasks automated', subLabel: 'per month' },
    { value: 24, suffix: 'h', label: 'Setup to live, under 24h on most builds', subLabel: '' },
    { value: 100, suffix: '%', label: 'Done for you', subLabel: '' },
  ];

  return (
    <section ref={sectionRef} className="w-full border-y border-border-color bg-void">
      <div className="content-width py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center lg:text-left">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center lg:items-start">
              <div className="font-display font-extrabold text-[clamp(40px,6vw,72px)] leading-none text-amber mb-4">
                {hasAnimated ? <CountUp end={stat.value} duration={2} /> : '0'}
                {stat.suffix}
              </div>
              <div className="font-sans text-[14px] leading-tight text-text-2 font-medium">
                {stat.label}
                {stat.subLabel && (
                  <>
                    <br />
                    {stat.subLabel}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <span>{count}</span>;
}
