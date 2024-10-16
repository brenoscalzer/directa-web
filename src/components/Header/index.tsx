import React, { useContext } from 'react';

import Cart from '../Cart';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';

import {
  Menu as MenuIcon,
  AccountCircle,
  ShoppingCart,
} from '@mui/icons-material';

import { AppContext } from '../../App';

export default function Header() {
  const appContext = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorCart, setAnchorCart] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorCart(null);
  };

  const onLogIn = () => {
    appContext.setLoginModalVisible(true);
    handleClose();
  }

  const onLogOut = () => {
    appContext.setLogged(false);
    localStorage.setItem('token', '');
    handleClose();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                aria-label="cart of current user"
                aria-controls="shopping-cart"
                aria-haspopup="true"
                onClick={handleCart}
                color="inherit"
              >
                <ShoppingCart />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                  appContext.logged ? (
                    <MenuItem onClick={onLogOut}>Log Out</MenuItem>
                  ) : (
                    <MenuItem onClick={onLogIn}>Log In</MenuItem>
                  )
                }
              </Menu>
              <Menu
                id="shopping-cart"
                anchorEl={anchorCart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorCart)}
                onClose={handleCloseCart}
              >
                <Cart visible={Boolean(anchorCart)} />
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}