import React, { useContext, useState } from 'react';

import { 
  CircularProgress, 
  CardMedia, 
  Button, 
  Typography, 
  CardContent, 
  CardActions,
  Card,
  Box,
  Snackbar
} from '@mui/material'

import { Product } from '../../models/product';
import { addToCart } from '../../services/cart';
import { AppContext } from '../../App';

interface Props {
  product: Product;

}

export default function OutlinedCard({ product }: Props) {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onAddItem = () => {
    if (!appContext.logged) {
      setMessage('Please login to add a item to your cart');
      return;
    }
    setLoading(true);
    addToCart(product.id).then(() => {
      setMessage('Item added successfully')
    }).catch((err) => {
      setMessage(err.response.data.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardMedia
          component="img"
          alt="product image"
          height="180"
          image={product.imageUrl}
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" component="div">
            R${product.price}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '20px' }}>
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button size="small" onClick={onAddItem}>
            {loading ? <CircularProgress style={{ width: '20px', height: '20px' }} /> : 'Add to cart'}
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        message={message}
      />
    </Box>
  );
}
