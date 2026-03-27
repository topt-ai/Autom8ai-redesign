import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const WEBHOOK_URL = (import.meta as any).env.DEV
  ? 'https://tommy-1.app.n8n.cloud/webhook-test/9dd8c269-e14a-408c-87d3-7ccbe01cf355'
  : 'https://tommy-1.app.n8n.cloud/webhook/9dd8c269-e14a-408c-87d3-7ccbe01cf355';

export default function LeadMagnet() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [timeDrains, setTimeDrains] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !name || !businessType || !timeDrains) return;

    setStatus('loading');

    try {
      const payload = { name, email, website, businessType, timeDrains: [timeDrains] };
      console.log('Submitting payload to n8n:', payload);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      console.log('n8n response status:', response.status);

      setStatus('success');
    } catch (error) {
      console.error('Error submitting form', error);
      setStatus('idle');
    }
  };

  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,232,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="content-width relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Copy */}
          <div className="max-w-lg">
            <span className="text-text-3 uppercase text-[12px] tracking-[0.1em] font-medium mb-4 block">
              FREE AUTOMATION AUDIT
            </span>
            <h2 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.92] tracking-[-0.04em] text-text-1 mb-6">
              Find out what's costing you hours every week.
            </h2>
            <p className="font-sans text-[18px] leading-[1.7] text-text-2 mb-8">
              Tell us your business type and your biggest time drain. We map out exactly what you could automate and send a custom report to your inbox.
            </p>
            <p className="text-text-3 text-[14px] font-medium italic">
              No pitch. No call needed. Just the map.
            </p>
          </div>

          {/* Right Form Widget */}
          <div className="bg-void border border-border-color rounded-xl p-8 shadow-2xl relative min-h-[480px]">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full absolute inset-0 text-center animate-in fade-in duration-500">
                <CheckCircle2 size={48} className="text-signal mb-6" />
                <h3 className="font-display font-bold text-2xl text-text-1 mb-4">
                  Audit submitted!
                </h3>
                <p className="text-text-2 mb-6 leading-relaxed max-w-[80%] mx-auto">
                  Thanks for testing out our tool, you can check your email with the audit. If you want to work with us you can <a href="#contact" className="text-signal hover:underline">book a free consultation meeting</a>.
                </p>
              </div>
            ) : status === 'loading' ? (
              <div className="flex flex-col items-center justify-center h-full absolute inset-0 text-center animate-pulse">
                <Loader2 size={48} className="text-signal mb-6 animate-spin" />
                <h3 className="font-display font-bold text-xl text-text-1 mb-4">
                  Building your automation map...
                </h3>
                <p className="text-text-3 text-sm">
                  Analyzing workflows...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div>
                  <label className="block text-text-1 font-medium mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-sm text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-text-1 font-medium mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-sm text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label className="block text-text-1 font-medium mb-2 text-sm">
                    Website <span className="text-text-3 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-sm text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                    placeholder="e.g. domain.com or https://..."
                  />
                </div>

                <div>
                  <label className="block text-text-1 font-medium mb-2 text-sm">
                    What type of business do you run?
                  </label>
                  <input
                    type="text"
                    required
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-sm text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                    placeholder="e.g. Dental clinic, Real estate agency, etc."
                  />
                </div>

                <div>
                  <label className="block text-text-1 font-medium mb-2 text-sm">
                    What takes most of your time?
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={timeDrains}
                    onChange={(e) => setTimeDrains(e.target.value)}
                    className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-sm text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors resize-none"
                    placeholder="e.g. Answering leads, following up, customer support, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || !name || !businessType || !timeDrains}
                  className="w-full bg-signal text-void font-bold px-6 py-4 rounded-md hover:bg-[#00EEFF] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  Generate My Automation Map <ArrowRight size={18} />
                </button>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
