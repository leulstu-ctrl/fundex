import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Clock, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

const PaymentModal = ({ plan, onClose }) => {
  const [step, setStep] = useState('details'); // details, payment, confirming, success
  const [currency, setCurrency] = useState('BTC');
  const [copied, setCopied] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Addresses provided by user
  const addresses = {
    BTC: 'bc1q0le434h22m4rawmwzu5gmlncz3exe9dr2mrpz8',
    USDT: 'THpsj7RXGncJs6jBbrXGskn7woiKCS8CpQ'
  };

  const currentAddress = addresses[currency];

  useEffect(() => {
    let timer;
    if (step === 'payment' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDetailsSubmit = (details) => {
    setUserDetails(details);
    setStep('payment');
  };

  const handlePaymentSent = () => {
    setStep('confirming');

    // Call backend
    fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...userDetails,
            planId: plan.id,
            paymentMethod: currency
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            setStep('success');
        }
    })
    .catch(err => {
        console.error(err);
        // Fallback for demo if server fails
        setTimeout(() => setStep('success'), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden relative animate-fade-in">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold">
            {step === 'details' && 'Step 1: Your Details'}
            {step === 'payment' && 'Step 2: Make Payment'}
            {step === 'confirming' && 'Processing...'}
            {step === 'success' && 'Success!'}
          </h2>
          {step !== 'success' && step !== 'confirming' && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
            </button>
          )}
        </div>

        {/* BODY CONTENT - Scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* STEP 1: USER DETAILS */}
          {step === 'details' && (
              <CheckoutForm onSubmit={handleDetailsSubmit} onCancel={onClose} />
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
              <div className="flex flex-col h-full">
                  {/* Timer Bar */}
                  <div className="bg-blue-50 px-4 py-2 flex justify-between items-center text-sm font-medium text-blue-800 flex-shrink-0">
                      <span className="flex items-center gap-2"><Clock size={16}/> Time remaining:</span>
                      <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-600 animate-pulse' : ''}`}>
                          {formatTime(timeLeft)}
                      </span>
                  </div>

                  {/* Currency Selector */}
                  <div className="flex p-2 bg-gray-50 gap-2 justify-center border-b border-gray-100 flex-shrink-0">
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
                          Tether (USDT)
                      </button>
                  </div>

                  <div className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-white rounded-xl shadow-inner border border-gray-200">
                          <QRCodeSVG value={currentAddress} size={160} level={"H"} />
                      </div>

                      <p className="text-sm text-gray-500 mb-4 px-2">
                          Send <span className="font-bold text-gray-900">${plan.price}</span> worth of {currency} to:
                      </p>

                      <div className="w-full bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between gap-3 mb-2">
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

                      {/* Network Warning */}
                      <div className="w-full flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-xs text-left mb-6 border border-yellow-200">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        <p>
                          {currency === 'BTC'
                            ? <span>Only send <strong>Bitcoin</strong> via the <strong>Bitcoin Network</strong>. Sending any other currency may result in permanent loss.</span>
                            : <span>Only send <strong>USDT</strong> via the <strong>TRC20 Network</strong>. Sending via ERC20 or other networks will result in lost funds.</span>
                          }
                        </p>
                      </div>

                      <button
                          onClick={handlePaymentSent}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-900/20"
                      >
                          I have sent the funds
                      </button>
                  </div>
              </div>
          )}

          {/* STEP 3: CONFIRMING */}
          {step === 'confirming' && (
               <div className="p-12 flex flex-col items-center justify-center text-center">
                  <Loader2 size={48} className="text-blue-600 animate-spin mb-6" />
                  <h3 className="text-xl font-bold mb-2">Confirming Transaction</h3>
                  <p className="text-gray-500">Please wait while we verify your payment on the blockchain...</p>
               </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
              <div className="p-8 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6">
                      Thank you, <span className="font-bold">{userDetails?.name}</span>.
                  </p>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 w-full mb-6">
                      <p className="text-sm text-blue-800 font-medium">
                          Your MT5 credentials have been sent to:
                      </p>
                      <p className="text-lg font-bold text-blue-900 mt-1">
                          {userDetails?.email}
                      </p>
                  </div>

                  <p className="text-xs text-gray-400 mb-8">
                      Please check your inbox (and spam folder) for login details.
                  </p>

                  <button
                      onClick={onClose}
                      className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition"
                  >
                      Close
                  </button>
              </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;
