import React, { useEffect, useState } from 'react';

import { ListItemText, ListItem, List, Box, CircularProgress } from '@mui/material';
import { getCart } from '../../services/cart';
import { Cart } from '../../models/cart';

interface Props {
    visible: boolean;
}

export default function CartComponent ({ visible }: Props) {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState<Cart>();


    useEffect(() => {
        if (visible) {
            setCart(undefined);
            setLoading(true);
            getCart().then(res => {
                setCart(res.data.cart);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [visible]);


    return (
        <Box sx={{ width: '100%', maxWidth: 360, minWidth: 300, bgcolor: 'background.paper', textAlign: 'center' }}>
            {
                loading && (
                    <CircularProgress />
                )
            }
            <List>
                {
                    cart?.items.map(item => (
                        <ListItem key={item.id} sx={{ justifyContent: 'space-between' }}>
                            <ListItemText primary={item.name} />
                            <ListItemText primary={`R$${item.price}`} sx={{ textAlign: 'right' }} />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}