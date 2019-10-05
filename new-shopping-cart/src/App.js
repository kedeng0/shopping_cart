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
import _ from 'lodash';

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
const db = firebase.database();




const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [user, setUser] = useState(null);


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
      const handleCartData = snap=>{
        if(snap.val()) {
          setSelected(snap.val());
        }
      };
      db.ref('inventory').on('value', handleData, error => alert(error));
      if (user) {
        mergeCarts(selected,user.uid);
        db.ref('cart/' + user.uid).on('value',handleCartData, error=>alert(error));
      } else {
        setSelected([])
      }
      return () => { 
        db.ref('inventory').off('value', handleData);
        if (user) {
        db.ref('cart/' + user.uid).off('value',handleCartData)
        }
       };
    }
    fetchProducts()
  }, [user]);

  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser)
    },[]); 

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
    setSelected(originalList.slice(0))

    if (user) {
      setFirebaseCart(user.uid,originalList.slice(0))
    }
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

    if (user) {
      setFirebaseCart(user.uid,originalList.slice(0))
    }
  }

  const setFirebaseCart = (userId, cart) => {
    db.ref('cart/' + userId).set(cart);
  }


const mergeCarts = (localCart, userId) => {
  db.ref('cart/' + userId).once('value')
  .then((dataSnapshot)=> {
    let savedCart = dataSnapshot.val() || [];
    localCart.forEach(item=>{
      let sku = item.data.sku;
      let size = item.size;
      const ind = savedCart.findIndex(cloud=>sku === cloud.data.sku && size===cloud.size);
      if (ind > -1) {
        if (product[sku][size] > 0) {
          product[sku][size] -= 1;
          savedCart[ind].quantity+=1;
        }
      } else {
        savedCart.push(item);
      }
    })
    db.ref('cart/' + userId).set(savedCart)
  })
}

const onCheckout = ()=> {



setSelected([]);
if (user) {
  setFirebaseCart(user.uid,selected);
}
alert('You have successfully checkedout!')
}

  return (
    <div className={classes.background}>
    <Header onMenuClick={()=>{setCartOpen(true)}} user={user}/>
    <Drawer anchor="bottom" open={cartOpen} onClose={()=>{setCartOpen(false)}}>
      <Cart items={selected || []} handleDelete={removeFromCart} onCheckout={onCheckout}/>
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