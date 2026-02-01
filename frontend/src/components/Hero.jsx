import React from 'react';

const Hero = () => {
  return (
    <div className="bg-fn-bg text-white pt-16 pb-24 text-center relative overflow-hidden">
        {/* Background gradient/glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
        Choose the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Best Plan</span>
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
        Select a funding model that suits your trading style.
      </p>

      {/* Curved divider simulation */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-[#0f0518] to-transparent" />
    </div>
  );
};

export default Hero;
