import React from 'react';

export default function TrustBar() {
  const industries = [
    'Real Estate Agency',
    'Medical Clinic',
    'E-Commerce Store',
    'Law Firm',
    'Consulting Practice',
    'Dental Office',
    'Insurance Agency',
    'Logistics Company',
  ];

  return (
    <div className="w-full h-[100px] border-y border-border-color flex items-center overflow-hidden bg-void relative">
      <div className="content-width flex items-center w-full">
        <div className="flex-shrink-0 mr-8 z-10 bg-void pr-4">
          <span className="text-text-3 uppercase text-[12px] font-medium tracking-[0.1em]">
            SYSTEMS BUILT FOR
          </span>
        </div>

        <div className="marquee-container flex-grow relative">
          <div className="marquee-content gap-8 items-center text-text-2 text-sm font-medium">
            {/* Double the content to ensure smooth infinite scrolling */}
            {[...industries, ...industries].map((industry, i) => (
              <React.Fragment key={i}>
                <span className="whitespace-nowrap">{industry}</span>
                <span className="text-border-hi">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
