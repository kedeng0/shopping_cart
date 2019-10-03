import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles({
  card: {
    maxWidth: 220,
    margin:4,
  },
  cardTop: {
      height:400
  },
  cardBottom: {
    justifyContent:'center',
    alignItems:'center', 
    flexDirection:'column'
  },
  chip: {
      margin:4,
  },
  media: {
    height: 280,
  },
  title : {
    textAlign:'center',
    margin:4,
  }
});

export default function ItemCard({data,addToCart}) {
  const classes = useStyles();
  const imageSource = "products/"+data.sku+"_1.jpg";
  const [size, setSize] = useState("");

  const handleClick = ()=> {
      if (size === "") {
        alert("Please select a size!");
        return;
      }
      setSize("")
      addToCart(data,size);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardTop}>
        <CardMedia
          className={classes.media}
          image={imageSource}
          title="pic"
        />
        <CardContent>
          <Typography className={classes.title} variant="h6" component="h6">
            {data.title}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h6" color="textSecondary" component="h6" className={classes.title}>
            {data.currencyFormat}{data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardBottom}>
        <div>
          <Chip className={classes.chip} color={size==='S'?'primary':'default'} label="S" onClick={()=>setSize('S')} disabled={data.S === 0}/>
          <Chip className={classes.chip} color={size==='M'?'primary':'default'} label="M" onClick={()=>setSize('M')} disabled={data.M === 0}/>
          <Chip className={classes.chip} color={size==='L'?'primary':'default'} label="L" onClick={()=>setSize('L')} disabled={data.L === 0}/>
          <Chip className={classes.chip} color={size==='XL'?'primary':'default'} label="XL" onClick={()=>setSize('XL')} disabled={data.XL === 0}/>
        </div>
        <Button className={classes.button} onClick={handleClick}>
        Add to Cart
      </Button>
      </CardActions>
    </Card>
  );
}