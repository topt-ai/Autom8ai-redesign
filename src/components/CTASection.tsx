import React, { useEffect } from 'react';

export default function CTASection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.com"});

      Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline-30min",
        config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        calLink: "tommy-autom8ai/30min",
      });

      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="contact" className="section-padding bg-surface relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,232,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="content-width relative z-10 flex flex-col items-center text-center">
        <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-4 block">
          FREE 30-MINUTE CALL
        </span>
        <h2 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.92] tracking-[-0.04em] text-text-1 mb-6">
          Let's map out your first automation.
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-text-2 max-w-2xl mx-auto mb-12">
          No pressure. No pitch deck. Just a conversation about where AI fits in your business — and what it would take to build it.
        </p>

        <div className="w-full h-[600px] max-w-[1000px] bg-void border border-border-color rounded-xl overflow-hidden shadow-2xl">
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }} id="my-cal-inline-30min"></div>
        </div>
      </div>
    </section>
  );
}
