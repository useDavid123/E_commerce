import React from 'react'
import {Container , Typography , Button , Grid} from '@material-ui/core'
import useStyles from './styles';
import CarItem from "./CartItem/CartItem"
import {Link} from "react-router-dom"
const Cart = ( {cart ,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart
} ) => {
    const classes = useStyles();
    
    // const isEmpty = !cart.line_items; 

    const  EmptyCart = () => {
        return(
        <Typography variant="subtitle1">You have no Items,<Link className={classes.link} to ="/">Start adding </Link>!
        
        </Typography>

        
        )
    }

    const FilledCart = () => {
        return(
        <>
        <Grid container spacing ={3}>
            {cart.line_items.map((item)=>{
                return(
                <Grid item xs={12} sm={6} key={item.id} >
                    <CarItem item={item}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart= {handleRemoveFromCart}
                    />
                    </Grid>
                )
            })}
            </Grid>
        <div className={classes.cardDetails} >
            <Typography variant ="h4" > Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} onClick={()=>handleEmptyCart} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Check out</Button>

            </div>
        </div>
        
        
        </>
        )
    }
     if(!cart.line_items) return "Loading!!"

    return (
        <div>
           <Container>
               <div className ={classes.toolbar} />
               
               <Typography className={classes.title} variant="h3" gutterBottom >Your Shopping Cart</Typography>
               
                { !cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
               
               </Container> 
        </div>
    )
}

export default Cart
