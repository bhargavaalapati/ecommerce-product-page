import React from 'react';

const ShoppingCart = ({ cartItems, setCartItems }) => {
    const handleRemoveItem = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="shopping-cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h4 className="cart-item-title">{item.title}</h4>
                                <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <strong>Total:</strong> ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;