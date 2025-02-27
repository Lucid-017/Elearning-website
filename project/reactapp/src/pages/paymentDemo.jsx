// // PaymentInitiate.js
// import React from "react";
// import { usePaystackPayment } from "react-paystack";

// const PaymentInitiate = ({ 
//   userEmail = "questcoding2001@gmail.com", 
//   amount = 100, 
//   onPaymentSuccess 
// }) => {
//   const config = {
//     reference: crypto.randomUUID(), // Generate a unique reference
//     email: userEmail,
//     amount: amount * 100, // Convert amount to kobo
//     publicKey: "pk_test_2bae9a955448e62e56c44bb23180d2e2ea3fc031",
//     // Uncomment the following line to force a redirect mode
//     // callback_url: "http://localhost:3000/payment-callback"
//   };

//   const onSuccess = async (reference) => {
//     console.log("Inline Payment Success Callback:", reference);
//     try {
//       const response = await fetch(`/api/verify-payment/${reference.reference}/`);
//       const data = await response.json();
//       if (data.message === "Payment successful") {
//         console.log("Verified payment inline.");
//         onPaymentSuccess();
//       } else {
//         console.error("Inline verification failed:", data);
//       }
//     } catch (error) {
//       console.error("Error verifying payment inline:", error);
//     }
//   };

//   const onClose = () => {
//     console.log("Payment window closed.");
//   };

//   const initializePayment = usePaystackPayment(config);

//   return (
//     <button onClick={() => initializePayment({onSuccess, onClose})}>
//       Pay Now
//     </button>
//   );
// };

// export default PaymentInitiate;


import React, { useState } from "react";

const InitiatePaymentButton = ({ amount='500', onPaymentInitiated }) => {
  const handleInitiatePayment = async () => {
    try {
      const response = await fetch("/api/initiate-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization headers if needed
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();

      if (data.payment_url) {
        // Redirect the user to the Paystack authorization URL
        window.location.href = data.payment_url;
        // Optionally, call onPaymentInitiated callback
        onPaymentInitiated();
      } else {
        console.error("Error initiating payment:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <button onClick={handleInitiatePayment}>
      Pay Now
    </button>
  );
};

export default InitiatePaymentButton;
