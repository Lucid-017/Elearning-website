// PaymentInitiate.js
import React from "react";
import { usePaystackPayment } from "react-paystack";

const PaymentInitiate = ({ 
  userEmail = "questcoding2001@gmail.com", 
  amount = 100, 
  onPaymentSuccess 
}) => {
  const config = {
    reference: new Date().getTime().toString(), // Generate a unique reference
    email: userEmail,
    amount: amount * 100, // Convert amount to kobo
    publicKey: "pk_live_2f441b4945f74384f553c0ec5860259eb140ca74",
    // Uncomment the following line to force a redirect mode
    // callback_url: "http://localhost:3000/payment-callback"
  };

  const onSuccess = async (reference) => {
    console.log("Inline Payment Success Callback:", reference);
    try {
      const response = await fetch(`/api/verify-payment/${reference.reference}/`);
      const data = await response.json();
      if (data.message === "Payment successful") {
        console.log("Verified payment inline.");
        onPaymentSuccess();
      } else {
        console.error("Inline verification failed:", data);
      }
    } catch (error) {
      console.error("Error verifying payment inline:", error);
    }
  };

  const onClose = () => {
    console.log("Payment window closed.");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button onClick={() => initializePayment({onSuccess, onClose})}>
      Pay Now
    </button>
  );
};

export default PaymentInitiate;
