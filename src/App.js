import React, { useState, useEffect } from 'react';
import {commerce} from './lib/commerce'

// import Products from "./components/products/products"

import {Products , Navbar , Cart , Checkout } from './components'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
// import { Checkout } from '@chec/commerce.js/features/checkout';



function App() {
 const [products , setProducts] = useState([])
 const [cart , setCart] = useState({});
 const [order , setOrder] = useState({})
 const [errorMessage, setErrorMessage] = useState('');

 const fetchProducts = async () => {
 const { data } = await commerce.products.list();

   setProducts(data);
 };

 const fetchCart = async () => {
   const cart = await commerce.cart.retrieve();

   setCart(cart);
 };

 const handleAddCart = async(productId , quantity) => {
    const {cart } =  await commerce.cart.add(productId , quantity);
    setCart(cart)
 }

 const handleUpdateCartQty = async (productId , quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity});
    setCart(cart)
 }
 const handleRemoveFromCart = async(productId) => {
   const {cart} = await commerce.cart.remove(productId)
   setCart(cart)
 }
 const handleEmptyCart = async() => {
   const {cart} = await commerce.cart.empty()
   setCart(cart)
 }
 useEffect(() => {
   fetchProducts();
   fetchCart();
  
  
 }, []);
 const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};
//  console.log(cart.line_items)

 
 return(
   <Router>
    <>
    <Navbar cartTotal={cart.total_items}/>
    <Switch>
      <Route exact path="/">
    <Products products={products}  handleAddCart={handleAddCart}/>
    </Route>
    <Route exact path="/cart">
    <Cart
    handleUpdateCartQty={handleUpdateCartQty}
    handleRemoveFromCart={handleRemoveFromCart}
    handleEmptyCart={handleEmptyCart}
    cart={cart}/>
    </Route>
    <Route>

     <Checkout cart={cart} handleCaptureCheckout={handleCaptureCheckout} order={order} error={errorMessage}/>
    </Route>

    </Switch>
    </>
    </Router>
 )
}

export default App;
