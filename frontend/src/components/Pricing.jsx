import React, { useEffect, useState } from 'react';

const DEFAULT_PLANS = [
  {
    id: 'instant-6000',
    name: 'Instant Funding',
    size: 6000,
    label: '$6,000',
    originalPrice: 99,
    price: 29.70,
    description: 'Start trading with a $6,000 account immediately.'
  },
  {
    id: 'instant-15000',
    name: 'Instant Funding',
    size: 15000,
    label: '$15,000',
    originalPrice: 199,
    price: 59.70,
    description: 'Start trading with a $15,000 account immediately.'
  },
  {
    id: 'instant-25000',
    name: 'Instant Funding',
    size: 25000,
    label: '$25,000',
    originalPrice: 349,
    price: 104.70,
    description: 'Start trading with a $25,000 account immediately.'
  },
  {
    id: 'instant-50000',
    name: 'Instant Funding',
    size: 50000,
    label: '$50,000',
    originalPrice: 649,
    price: 194.70,
    description: 'Start trading with a $50,000 account immediately.'
  },
  {
    id: 'instant-100000',
    name: 'Instant Funding',
    size: 100000,
    label: '$100,000',
    originalPrice: 1199,
    price: 359.70,
    description: 'Start trading with a $100,000 account immediately.'
  }
];

const Pricing = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Try to fetch from API, but fallback to DEFAULT_PLANS on error
    fetch('http://localhost:3001/api/plans')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setPlans(data);
          setSelectedPlan(data[0]);
        } else {
          // Fallback if data is empty
          setPlans(DEFAULT_PLANS);
          setSelectedPlan(DEFAULT_PLANS[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn("Failed to fetch plans, using default values:", err);
        setPlans(DEFAULT_PLANS);
        setSelectedPlan(DEFAULT_PLANS[0]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-white">Loading plans...</div>;
  }

  if (!selectedPlan) {
      return <div className="text-center py-20 text-white">No plans available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Instant Funding</h2>
            <p className="text-gray-400">Select your account size to get started immediately.</p>
        </div>

      {/* Account Size Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 border ${
              selectedPlan.id === plan.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-purple-900/40 scale-105'
                : 'bg-[#1e122b] text-gray-400 border-purple-900/30 hover:border-purple-500 hover:text-white'
            }`}
          >
            {plan.label}
          </button>
        ))}
      </div>

      {/* Selected Plan Details Card */}
      <div className="bg-[#2a1b3d] border border-purple-800/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedPlan.name} - {selectedPlan.label}</h3>
                <p className="text-gray-400 mb-6">{selectedPlan.description}</p>

                <ul className="space-y-4 text-gray-300 mb-8">
                     <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        <span className="font-medium">Profit Split up to 95%</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        <span className="font-medium">No Time Limit</span>
                     </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        <span className="font-medium">Balance Based Drawdown</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        <span className="font-medium">Scale up to $2M</span>
                     </li>
                </ul>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#1e122b] rounded-2xl p-8 border border-purple-900/30">
                <div className="text-center mb-6">
                    <div className="text-gray-500 line-through text-xl mb-1">${selectedPlan.originalPrice}</div>
                    <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        ${selectedPlan.price}
                    </div>
                    <div className="text-green-400 text-sm font-semibold mt-2 px-3 py-1 bg-green-400/10 rounded-full inline-block">
                        Save 70%
                    </div>
                </div>

                <button
                onClick={() => onSelectPlan(selectedPlan)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/30 hover:scale-[1.02]"
                >
                Start Trading Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
