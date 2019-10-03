import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';



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

export default function ItemCard({data}) {
  const classes = useStyles();
  const imageSource = "products/"+data.sku+"_1.jpg";

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
          <Chip className={classes.chip} label="S" />
          <Chip className={classes.chip} label="M" />
          <Chip className={classes.chip} label="L" />
          <Chip className={classes.chip} label="XL" />
      </CardActions>
    </Card>
  );
}