// VerifyPayment.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const VerifyPayment = () => {
  const location = useLocation();
  const [status, setStatus] = useState("Verifying payment, please wait...");

  useEffect(() => {
    // Extract the payment reference from the query parameters.
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");

    if (reference) {
      // Call the backend verification endpoint.
      fetch(`/api/verify-payment/${reference}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Payment successful") {
            setStatus("Payment successful! Thank you.");
          } else {
            setStatus("Payment verification failed. Please contact support.");
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
          setStatus("An error occurred during verification.");
        });
    } else {
      setStatus("No payment reference found in the URL.");
    }
  }, [location]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyPayment;