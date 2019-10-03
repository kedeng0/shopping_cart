import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: 200,
      marginRight:8,
    },
   
  }));

  export default function CartItemCard({listing}) {
    const classes = useStyles();
    const {data,quantity,size} = listing;
    
    const imageSource = "products/"+data.sku+"_1.jpg";
    const info = "Size: "+size + "  Quantity: " + quantity
    const price = "Price: " + data.currencyFormat + data.price * quantity;

    const subtitle = (
        <div>
            <Typography variant='body2'>
            {info}
          </Typography>
          <Typography variant='body2'>
            {price}
          </Typography>
        </div>
    )

    return (
        <GridListTile key={data.sku} className={classes.root}>       
            <img src={imageSource} alt={data.title}/>
            <GridListTileBar
              title={data.title}
              subtitle={subtitle}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              
            />
        </GridListTile>
    )



  }