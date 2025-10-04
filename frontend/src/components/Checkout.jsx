// // src/components/CheckoutPage.jsx
import React, { useState, useContext } from "react";
import { CreditCard, Smartphone, Banknote, Wallet } from "lucide-react";
import { EcommContext } from "../../store/ecomprovider";
import CheckoutModal from "./CheckoutModal";

export default function CheckoutPage() {
  const { cart, setCart } = useContext(EcommContext);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

const amount = cart
  ?.filter((item) => item.product?.stock > 0)
  .reduce(
    (total, item) =>
      total + Number(item.product.price || 0) * Number(item.quantity || 1),
    0
  );


  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPayment = async () => {
    if (!cart.length) return alert("Cart is empty!");

    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const order = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Innovative Hub",
        description: "Membership / Payment",
        order_id: order.id,
        handler: () => {
          setCart([]);
          setIsCheckoutModalOpen(true);
        },
        theme: { color: "#e50914" },
        method: { [selectedMethod]: true },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }

    setLoading(false);
  };

  return (
    <>
      <CheckoutModal
        isCheckoutModalOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-1">Secure checkout powered by Razorpay</p>

          <div className="bg-gray-50 p-4 rounded-xl my-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between mt-3 text-gray-700">
              <span>Total</span>
              <span>₹{amount}</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3">Choose Payment Method</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { name: "card", icon: <CreditCard size={18} /> },
              { name: "upi", icon: <Smartphone size={18} /> },
              { name: "netbanking", icon: <Banknote size={18} /> },
              { name: "wallet", icon: <Wallet size={18} /> },
            ].map((m) => (
              <button
                key={m.name}
                onClick={() => setSelectedMethod(m.name)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${
                  selectedMethod === m.name
                    ? "border-red-600 bg-red-50 text-red-600 font-semibold"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {m.icon} {m.name.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleRazorpayPayment}
            disabled={loading || !cart.length}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${amount}`}
          </button>
        </div>
      </div>
    </>
  );
}
