import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import GridList from '@material-ui/core/GridList';
import { GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles({
 background:{
   backgroundColor:'#37474f'
 }
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div className={classes.background}>
    <Header/>
    <Container>
    <GridList cellHeight={500} cols={4}>
      {products.map(product => <GridListTile key={product.sku}><ItemCard data={product}/></GridListTile>)}
    </GridList>
    </Container>
    </div>
  );
};

export default App;