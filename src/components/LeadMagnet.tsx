import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function LeadMagnet() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [timeDrains, setTimeDrains] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const businessTypes = ['Clinic', 'Real Estate', 'E-Commerce', 'Law Firm', 'Agency', 'Other'];
  const drains = [
    'Answering leads',
    'Follow-ups',
    'Scheduling',
    'Data entry',
    'Customer support',
    'Reporting',
    'Other',
  ];

  const handleDrainToggle = (drain: string) => {
    if (timeDrains.includes(drain)) {
      setTimeDrains(timeDrains.filter((d) => d !== drain));
    } else if (timeDrains.length < 3) {
      setTimeDrains([...timeDrains, drain]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    try {
      // Simulate webhook call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Real webhook call would go here
      // await fetch('https://autom-8-ai.app.n8n.cloud/webhook/automation-audit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ businessType, timeDrains, email }),
      // });

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
          <div className="bg-void border border-border-color rounded-xl p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center animate-fade-up">
                <CheckCircle2 size={48} className="text-signal mb-6" />
                <h3 className="font-display font-bold text-2xl text-text-1 mb-4">
                  Your map is on the way.
                </h3>
                <p className="text-text-2">
                  Check your inbox in a few minutes.
                </p>
              </div>
            ) : status === 'loading' ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center animate-fade-up">
                <Loader2 size={48} className="text-signal mb-6 animate-spin" />
                <h3 className="font-display font-bold text-xl text-text-1 mb-4">
                  Building your automation map...
                </h3>
                <p className="text-text-3 text-sm">
                  Analyzing {businessType} workflows...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Step 1 */}
                <div className={`transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <label className="block text-text-1 font-medium mb-4">
                    1. What type of business do you run?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setBusinessType(type);
                          if (step === 1) setStep(2);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                          businessType === type
                            ? 'bg-signal/20 border-signal text-signal'
                            : 'bg-surface-2 border-border-color text-text-2 hover:border-border-hi'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <label className="block text-text-1 font-medium mb-2">
                    2. What takes up most of your time?
                  </label>
                  <p className="text-text-3 text-xs mb-4">Select up to 3</p>
                  <div className="flex flex-wrap gap-2">
                    {drains.map((drain) => {
                      const isSelected = timeDrains.includes(drain);
                      const isDisabled = !isSelected && timeDrains.length >= 3;
                      return (
                        <button
                          key={drain}
                          type="button"
                          onClick={() => {
                            handleDrainToggle(drain);
                            if (step === 2 && timeDrains.length > 0) setStep(3);
                          }}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                            isSelected
                              ? 'bg-signal/20 border-signal text-signal'
                              : isDisabled
                              ? 'bg-surface-2 border-border-color text-text-3 opacity-50 cursor-not-allowed'
                              : 'bg-surface-2 border-border-color text-text-2 hover:border-border-hi'
                          }`}
                        >
                          {drain}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`transition-opacity duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <label className="block text-text-1 font-medium mb-4">
                    3. Where should we send your map?
                  </label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-2 border border-border-color rounded-md px-4 py-3 text-text-1 placeholder-text-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!email || !businessType || timeDrains.length === 0}
                      className="w-full bg-signal text-void font-bold px-6 py-4 rounded-md hover:bg-[#00EEFF] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate My Automation Map <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
