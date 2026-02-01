import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check } from 'lucide-react';

const PaymentModal = ({ plan, onClose }) => {
  const [currency, setCurrency] = useState('BTC'); // 'BTC' or 'USDT'
  const [copied, setCopied] = useState(false);

  // Addresses provided by user
  const addresses = {
    BTC: 'bc1q0le434h22m4rawmwzu5gmlncz3exe9dr2mrpz8',
    USDT: 'THpsj7RXGncJs6jBbrXGskn7woiKCS8CpQ'
  };

  const currentAddress = addresses[currency];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">Deposit {currency}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Currency Selector */}
        <div className="flex p-2 bg-gray-50 gap-2 justify-center">
            <button 
                onClick={() => setCurrency('BTC')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${currency === 'BTC' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
            >
                Bitcoin (BTC)
            </button>
            <button 
                onClick={() => setCurrency('USDT')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${currency === 'USDT' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
            >
                Tether (USDT - TRC20)
            </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          
          <div className="mb-6 p-4 bg-white rounded-xl shadow-inner border border-gray-200">
            <QRCodeSVG value={currentAddress} size={180} level={"H"} />
          </div>

          <h3 className="text-xl font-bold mb-2">Your {currency} Address</h3>
          <p className="text-sm text-gray-500 mb-6 px-4">
            Use this address only to receive or deposit {currency} on the {currency === 'BTC' ? 'Bitcoin' : 'TRC20'} network. 
            <br/>Lost funds cannot be recovered.
          </p>

          {/* Address Box */}
          <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between gap-3">
            <div className="text-xs font-mono break-all text-left text-gray-700">
              {currentAddress}
            </div>
            <button 
              onClick={handleCopy}
              className="text-gray-500 hover:text-gray-900 transition flex-shrink-0"
              title="Copy Address"
            >
              {copied ? <Check size={20} className="text-green-500"/> : <Copy size={20} />}
            </button>
          </div>
          
          <div className="mt-6 w-full p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
             Amount to Pay: <span className="font-bold text-lg">${plan.price}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
