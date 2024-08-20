import React from 'react';
import axios from 'axios';

const RazorpayPayment = ({ amount, onSuccess }) => {
  const handlePayment = async () => {
    try {
      // Make an API request to your backend to create a Razorpay order
      const response = await axios.post('https://radiantrides-backend.onrender.com/api/orders', {
        amount: amount * 100, // Razorpay expects amount in paisa
      });
      console.log('Razorpay Order API Response:', response.data);
      const { options } = response.data;

      const razorpay = new window.Razorpay(options);

      
      razorpay.open();

      razorpay.on('payment.success', (response) => {
        console.log('Payment success');
        onSuccess(response.razorpay_payment_id);
      });

      razorpay.on('payment.error', (error) => {
        console.error('Payment failed:', error);
      });

      
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;
