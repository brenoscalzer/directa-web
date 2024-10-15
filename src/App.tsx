import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import CardList from './components/CardList'
import { getProducts } from './services/products';
import { Product } from './models/product';
import LoginModal from './components/LoginModal';

const appDefaultContext = {
  logged: false,
  loginModalVisible: false,
  setLogged: (_: boolean) => {},
  setLoginModalVisible: (_: boolean) => {}
}

export const AppContext = React.createContext(appDefaultContext);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [logged, setLogged] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.data.products);
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
      setLoginModalVisible
    }}>
      <div className="App">
        <Header />
        <CardList products={products}></CardList>
        <LoginModal />
      </div>
    </AppContext.Provider>
  );
}

export default App;
