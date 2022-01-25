import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core'
import useStyles from './styles';
import Product from './product/product';

// const productss = [

// {id:1,name:"Shoes" , description:"running shoes" , price:"$5"},
// {id:2,name:"Mac" , description:"Apple Mac" , price:"$10"}

// ]

function Products({products , handleAddCart}) {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>

      {
      products.map((product)=> (
          <Grid item key = {product.id} xs={12} sm={6} lg={3} >
              <Product product = {product} onAddToCart={handleAddCart} />
          </Grid>
      ))}
      </Grid>
        </main>
    )
}

export default Products

