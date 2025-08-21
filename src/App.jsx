import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import ShoppingCart from './components/ShoppingCart';
import { MdShoppingBag } from 'react-icons/md';
import './App.css';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        const uniqueCategories = ['all', ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">E-commerce Store <MdShoppingBag /></h1>
        <div className="cart-icon-container" onClick={toggleCartVisibility}>
          <span className="cart-count">{cartItems.length}</span>
          <MdShoppingBag className="cart-icon" />
        </div>
      </header>
      <main>
        <div className="filters-container">
          <SearchBar onSearchChange={setSearchQuery} />
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {isCartVisible ? (
          <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
        ) : (
          <ProductList
            products={filteredProducts}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
    </div>
  );
}

export default App;