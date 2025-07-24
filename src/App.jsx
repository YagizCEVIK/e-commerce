
import { useState } from 'react';
import './App.css';

import macbookImg from './assets/products/macbook.jpg';
import airpodsImg from './assets/products/airpods.jpg';
import iphoneImg from './assets/products/iphone.jpg';
import watchImg from './assets/products/watch.jpg';
import mouseImg from './assets/products/mouse.jpg';
import LoginRegister from './LoginRegister';
import Payment from './Payment';

const initialProducts = [
  { id: 1, name: 'MacBook Air', price: 42000, image: macbookImg },
  { id: 2, name: 'AirPods Pro', price: 8500, image: airpodsImg },
  { id: 3, name: 'iPhone 15', price: 60000, image: iphoneImg },
  { id: 4, name: 'Apple Watch', price: 15000, image: watchImg },
  { id: 5, name: 'Magic Mouse', price: 3500, image: mouseImg },
];

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('products');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
    setPage('products');
    setShowPayment(false);
  };

  if (!isLoggedIn) {
    return <LoginRegister onLogin={() => setIsLoggedIn(true)} />;
  }

  if (showPayment) {
    return <Payment cart={cart} onBack={() => setShowPayment(false)} />;
  }

  return (
    <div className="container">
      <nav style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
        <button onClick={() => setPage('products')}>Ürünler</button>
        <button onClick={() => setPage('cart')}>Sepet</button>
        <button onClick={handleLogout} style={{ marginLeft: 'auto', background: '#db4437' }}>Çıkış Yap</button>
      </nav>

      {page === 'products' && (
        <>
          <h1 className="text-dark">Ürünler</h1>
          <div className="product-grid">
            {initialProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <span className="product-name">{product.name}</span>
                <span className="product-price">{product.price}₺</span>
                <button onClick={() => addToCart(product)}>Sepete Ekle</button>
              </div>
            ))}
          </div>
        </>
      )}

      {page === 'cart' && (
        <>
          <h2 className="text-dark">Sepet</h2>
          {cart.length === 0 ? (
            <p className="text-dark">Sepetiniz boş.</p>
          ) : (
            <>
              <div className="cart-grid">
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-card">
                    <img src={item.image} alt={item.name} className="cart-image" />
                    <span className="cart-name">{item.name}</span>
                    <span className="cart-price">{item.price}₺</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowPayment(true)} style={{ width: '100%', marginTop: 24, background: '#646cff', color: '#fff' }}>
                Ödeme Ekranına Geç
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
