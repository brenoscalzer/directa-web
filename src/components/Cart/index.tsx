import React, { useContext, useEffect, useState } from 'react';

import { ListItemText, ListItem, List, Box, CircularProgress, Typography, Button } from '@mui/material';
import { clearCart, getCart } from '../../services/cart';
import { Cart } from '../../models/cart';
import { AppContext } from '../../App';

interface Props {
    visible: boolean;
}

export default function CartComponent ({ visible }: Props) {
    const appContext = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [cart, setCart] = useState<Cart>();

    const loadCart = () => {
        setCart(undefined);
        setLoading(true);
        getCart().then(res => {
            setCart(res.data.cart);
        }).catch((err) => {
            appContext.setMessage(err.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    const onClearCart = () => {
        setLoadingButton(true);
        clearCart().then(() => {
            setLoadingButton(false);
            loadCart();
        }).catch((err) => {
            appContext.setMessage(err.response.data.message);
            setLoadingButton(false);
        });
    }

    useEffect(() => {
        if (visible) {
            loadCart();
        }
    }, [visible]);


    return (
        <Box sx={{ width: '100%', maxWidth: 360, minWidth: 300, bgcolor: 'background.paper', textAlign: 'center' }}> 
          <Typography variant="h5" component="div" style={{ textAlign: 'left', marginLeft: '16px', marginTop: '10px' }}>
            Your Cart
          </Typography>
            {
                loading && (
                    <CircularProgress />
                )
            }
            <List>
                {
                    (!cart || cart.items.length === 0) && (
                        <ListItem>
                            <ListItemText primary="No item added to your cart" />
                        </ListItem>
                    )
                }
                {
                    cart?.items.map(item => (
                        <ListItem key={item.id} sx={{ justifyContent: 'space-between' }}>
                            <ListItemText primary={item.name} />
                            <ListItemText primary={`R$${item.price}`} sx={{ textAlign: 'right' }} />
                        </ListItem>
                    ))
                }
            </List>
            {
                cart && cart.items.length !== 0 && (
                    <Button onClick={onClearCart} type="button" variant="contained" color="error" sx={{ height: '40px', margin: '10px' }}>
                            {
                                loadingButton ? <CircularProgress /> : 'Clear Cart'
                            }
                    </Button>
                )
            }
        </Box>
    )
}