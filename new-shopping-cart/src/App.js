import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import GridList from '@material-ui/core/GridList';
import { GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Cart from './components/Cart';
import firebase from 'firebase/app';
import 'firebase/database';

const useStyles = makeStyles({
 background:{
   backgroundColor:'#37474f'
 },
 container: {
    marginTop:64,
 }
});

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBFHpRjbJF-DI6k9G_sIpY8hRU7WRfhI68",
  authDomain: "shopping-cart-549a6.firebaseapp.com",
  databaseURL: "https://shopping-cart-549a6.firebaseio.com",
  projectId: "shopping-cart-549a6",
  storageBucket: "",
  messagingSenderId: "54689722369",
  appId: "1:54689722369:web:c223a924c885e40a9f5000"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();



const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const products = Object.values(product);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const data = await response.json();
      const handleData = snap=>{
        if(snap.val()) {
          let result = {}
          Object.keys(data).forEach(p=>{result[p] = Object.assign(data[p],snap.val()[p])});
          setProduct(result);
        }
      };
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData)}; 
    }

    fetchProducts()
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