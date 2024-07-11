// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import Sort from './components/Sort';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption) {
      result = [...result].sort((a, b) => {
        if (sortOption === 'priceAsc') return a.price - b.price;
        if (sortOption === 'priceDesc') return b.price - a.price;
        return 0;
      });
    }
    setFilteredProducts(result);
  }, [searchQuery, sortOption, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="App">
      <SearchBar setSearchQuery={setSearchQuery} />
      <Sort setSortOption={setSortOption} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
