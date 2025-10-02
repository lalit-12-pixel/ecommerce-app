import React, { useState } from "react";
import { CreditCard, Smartphone, Banknote, Wallet } from "lucide-react"; // icons

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const amount = 499; // example amount

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    // 👉 Call backend to create an order
    const orderRes = await fetch("http://localhost:3001/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100, currency: "INR" }),
    });

    const order = await orderRes.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Innovative Hub",
      description: "Membership / Payment",
      order_id: order.id,
      handler: function (response) {
        alert("✅ Payment Successful!");
      },
      theme: { color: "#e50914" }, // Netflix red
      method: { [selectedMethod]: true },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        {/* Branding / Hero */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-1">Secure checkout powered by Razorpay</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between mt-3 text-gray-700">
            <span>Plan</span>
            <span>Premium</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>₹{amount}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span>₹0</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
            <span>Total</span>
            <span>₹{amount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="text-lg font-semibold mb-3">Choose Payment Method</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setSelectedMethod("card")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${
              selectedMethod === "card"
                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CreditCard size={18} /> Card
          </button>

          <button
            onClick={() => setSelectedMethod("upi")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${
              selectedMethod === "upi"
                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Smartphone size={18} /> UPI
          </button>

          <button
            onClick={() => setSelectedMethod("netbanking")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${
              selectedMethod === "netbanking"
                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Banknote size={18} /> Netbanking
          </button>

          <button
            onClick={() => setSelectedMethod("wallet")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${
              selectedMethod === "wallet"
                ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Wallet size={18} /> Wallet
          </button>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );
}
