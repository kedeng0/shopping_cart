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
 }
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const toggleDrawer = (open) => event => {
    setCartOpen(open);
  };

  const addToCart = (data,size)=> {
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

  return (
    <div className={classes.background}>
    <Header onMenuClick={()=>{setCartOpen(true)}}/>
    <Drawer anchor="bottom" open={cartOpen} onClose={toggleDrawer(false)}>
      <Cart items={selected}/>
    </Drawer>
    <Container>
    <GridList cellHeight={500} cols={4}>
      {products.map(product => <GridListTile key={product.sku}><ItemCard data={product} addToCart={addToCart}/></GridListTile>)}
    </GridList>
    </Container>
    </div>
  );
};

export default App;