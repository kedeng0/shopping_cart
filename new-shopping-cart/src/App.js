import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import GridList from '@material-ui/core/GridList';
import { GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Cart from './components/Cart';

const useStyles = makeStyles({
 background:{
   backgroundColor:'#37474f'
 },
 container: {
    marginTop:64,
 }
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const products = Object.values(product);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const product = await response.json();
      const inventory_response = await fetch('./data/inventory.json');
      const inventory = await inventory_response.json();
      let result = {}
      Object.keys(product).forEach(p=>{result[p] = Object.assign(product[p],inventory[p])});
      setProduct(result);
    };
    
    fetchProducts();
  }, []);

  const toggleDrawer = (open) => event => {
    setCartOpen(open);
  };

  const addToCart = (data,size)=> {
    if (product[data.sku][size] <= 0) {
      alert('Size out of stock!');
      return;
    }
    product[data.sku][size]-=1;
    console.log('item',product[data.sku][size] )

      let originalList = selected;
      const ind = originalList.findIndex(item=>item.data.sku === data.sku && item.size===size);
      if (ind > -1) {
        originalList[ind].quantity+=1;
      } else {
        originalList.push({
          data,
          quantity: 1,
          size,
        })
      }
      setSelected(originalList)
     
     
    
  }

  const removeFromCart = (data,size) => {
    product[data.sku][size]+=1;
    let originalList = selected;
    const ind = originalList.findIndex(item=>item.data.sku === data.sku && item.size===size);

    if (ind > -1) {
      originalList[ind].quantity -= 1;
      if (originalList[ind].quantity === 0) {
        originalList.splice(ind,1);
      }
    }
    setSelected(originalList.slice(0))
  }

  return (
    <div className={classes.background}>
    <Header onMenuClick={()=>{setCartOpen(true)}}/>
    <Drawer anchor="bottom" open={cartOpen} onClose={toggleDrawer(false)}>
      <Cart items={selected} handleDelete={removeFromCart}/>
    </Drawer>
    <Container className={classes.container}>
    <GridList cellHeight={500} cols={4}>
      {products.map(product => <GridListTile key={product.sku}><ItemCard data={product} addToCart={addToCart}/></GridListTile>)}
    </GridList>
    </Container>
    </div>
  );
};

export default App;