import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaystackButton } from "react-paystack"

import Review from './Review';

// const stripePromise = loadStripe("pk_test_51JeMlqCgYG8rVV90RW3yV4R3qsqtUn4AKCb7dl2aAw5nDOhHC2Lr6GaO5r8dWtWqcaoHHZDiH59mDhIG9tlKYQRD00Hf0ZT2UT");

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {

  const handleSubmit =  () => {
    
      const componentProps ={
        email:shippingData.email,
        amount: 100000,
        
       publicKey: "pk_test_36ae31f5e0df7734c904f55eb1e542825c3f8a3f",
       text: "Pay Now",
       onSuccess: () =>
         alert("Thanks for doing business with us! Come back soon!!"),
       onClose: () => nextStep(),
    
      }
         return(
           <>
           console.log("something")
          <PaystackButton {...componentProps} />
          </>
         )
        
 }

     
    
  

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
     
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button  variant="contained" onClick={handleSubmit} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
         
    </>
  );
};

export default PaymentForm;