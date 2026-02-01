import React, { useEffect, useState } from 'react';

const Pricing = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/plans')
      .then(res => res.json())
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch plans", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading plans...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div 
            key={plan.id} 
            className="bg-[#2a1b3d] border border-purple-800/50 rounded-2xl p-6 hover:border-purple-500 transition shadow-lg flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
            
            <div className="mb-6">
              <span className="text-gray-500 line-through text-lg mr-2">${plan.originalPrice}</span>
              <span className="text-4xl font-bold text-white">${plan.price}</span>
            </div>
            
            <div className="flex-grow">
               <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                     <span>Profit Split up to 95%</span>
                  </li>
                  <li className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                     <span>No Time Limit</span>
                  </li>
                   <li className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                     <span>Balance Based Drawdown</span>
                  </li>
               </ul>
            </div>

            <button 
              onClick={() => onSelectPlan(plan)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-900/20"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
