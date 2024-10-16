import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import CardList from './components/CardList'
import { getProducts } from './services/products';
import { Product } from './models/product';
import LoginModal from './components/LoginModal';
import { Snackbar } from '@mui/material';

const appDefaultContext = {
  message: '',
  logged: false,
  loginModalVisible: false,
  setLogged: (_: boolean) => {},
  setLoginModalVisible: (_: boolean) => {},
  setMessage: (_: string) => {}
}

export const AppContext = React.createContext(appDefaultContext);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [logged, setLogged] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.data.products);
    }).catch((err) => {
      setMessage(err.response.data.message)
    });
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    }
  }, []);

  return (
    <AppContext.Provider value={{
      logged, 
      loginModalVisible,
      setLogged, 
      setLoginModalVisible,
      message,
      setMessage
    }}>
      <div className="App">
        <Header />
        <CardList products={products}></CardList>
        <LoginModal />
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={6000}
          onClose={() => setMessage('')}
          message={message}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
