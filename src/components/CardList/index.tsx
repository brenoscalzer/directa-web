import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import Card from '../Card';

import { Product } from '../../models/product';

interface Props {
  products: Product[];
} 

export default function CardList(props: Props) {
  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Grid container spacing={2}>
        {
          props.products.map((item, index) => (
            <Grid size={4} key={`${item.createdAt}${index}`}>
              <Card product={item} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}