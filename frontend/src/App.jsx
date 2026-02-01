import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import PaymentModal from './components/PaymentModal';

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen font-sans bg-[#0f0518] text-white selection:bg-purple-500/30">
      <Header />
      <Hero />

      <main>
        <Pricing onSelectPlan={setSelectedPlan} />
      </main>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      <footer className="text-center text-gray-500 py-8 text-sm">
        © 2026 FundedNext Clone. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
