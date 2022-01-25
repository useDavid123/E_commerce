import React , {useState , useEffect} from 'react'
import useStyles from './styles';
import {Paper ,Stepper , Step , StepLabel ,Typography , CircularProgress , Divider , Button} from "@material-ui/core"
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import {commerce} from "../../../lib/commerce"


const Checkout = ({cart , order ,handleCaptureCheckout ,error}) => {
    const classes = useStyles();
    const steps = ["shipping address" , "Payment Details"]
    const [activeStep , setActiveStep] = useState(0)
    const [checkoutToken , setCheckoutToken] = useState()
    const [shippingData , setShippingData] = useState({})
    

    
    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
            
              setCheckoutToken(token);
            //   console.log(token)
            } catch {
            //   if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);

       const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep + 1)

       const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep  - 1)

      const next = (data) => 
      {
        setShippingData(data)
        nextStep()

      }

    const Form = () => activeStep === 0  ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm  shippingData={shippingData} 
    checkoutToken={checkoutToken}  backStep={backStep} onCaptureCheckout={handleCaptureCheckout} nextStep={nextStep} /> 
    const Confirm = () => {
        return(
            <div>Checkout</div>
        )
    }
    return (
        <>
           <div className={classes.toolbar} /> 
           <main className={classes.layout}>
               <Paper className={classes.paper}>
                   <Typography variant="h4" align="center">Checkout</Typography>
                   <Stepper activeStep={activeStep} className={classes.stepper}>
                       {steps.map((step)=>
                           (
                       <Step key={step}>
                           <StepLabel>{step}</StepLabel>
                       </Step>
                           )
                       )}
                   </Stepper>
                   { activeStep === steps.length ? <Confirm /> : checkoutToken && <Form /> }
               </Paper>
           </main>
        </>
    
    )
}

export default Checkout
