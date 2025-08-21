// src/components/ProductCard.jsx

import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-image"
            />
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-category">{product.category}</p>
            </div>
        </div>
    );
};

export default ProductCard;