import React from 'react';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import CartItemCard from './CartItemCard'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';





const useStyles = makeStyles(theme => ({
    bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:8,
    },
    root: {
        display:'flex',
        flexDirection:'column',
    },
    container: {
      alignItems:'flex-start',
      justifyContent:'flex-start',
      paddingTop:10,
      height: 300,
    },
    gridList: {
        height:280,
        flexWrap: 'nowrap',
        flexGrow:1,
        transform: 'translateZ(0)',
      },
    title: {
        margin:8,
    }
  }));



export default function Cart({items}) {
    const classes = useStyles();
    const products = Object.values(items);

  return (
    <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
            Your Cart          
            </Typography>        
            <div className={classes.container}>
            <GridList className={classes.gridList} cols={2.5}>
                {products.map(product=><CartItemCard data={product}/>)}
            </GridList>
        </div>
        <Divider variant="fullwidth" />
        <div className={classes.bottom}>
        <Typography variant="h6" className={classes.title}>
            SubTotal: $20
            </Typography> 
        <Button variant="contained" className={classes.button}>
        Checkout
      </Button>
        </div>
    </div>
  );
}