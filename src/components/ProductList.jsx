import React from 'react';
import ProductCard from './ProductCard';
import { FaShoppingCart } from 'react-icons/fa';

const ProductList = ({ products, loading, error, onAddToCart }) => {
    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="product-list-container">
            <h2>Products ({products.length})</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;