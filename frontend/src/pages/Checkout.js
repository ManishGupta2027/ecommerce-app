import React from "react";
import { useCart } from "../context/CartContext"; // Context for managing cart state
import axios from "axios";

const Checkout = () => {
  const { cart, dispatch } = useCart();

  // Handle order placement
  const handleOrder = async () => {
    try {
      //update Qty server side Json data
      for (let item of cart) {
        await axios.post('http://localhost:5000/api/products/update-quantity', {
          productId: item.id,
          size: item.selectedSize,
          quantity: item.quantity,
        });
      }
      // Calculate the total price of the order
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Send the order data to the server to be saved
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please log in to place an order");
        return;
      }

      const cartItems = cart.map((product) => ({
        productId: product.id,
        size: product.selectedSize,
        quantity: product.quantity,
        price: product.price,
      }));

      const orderData = {
        userId: user.id,
        cartItems: cartItems,
        total: total,
      };

      // Send POST request to save the order
      const response = await axios.post(
        "http://localhost:5000/api/orders/place-order",
        orderData
      );

      // Notify the user and clear the cart if the order was placed successfully
      alert("Order Placed Successfully!");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // If the cart is empty
  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <h2>Checkout</h2>
        <p>Your cart is empty. Add items to proceed to checkout.</p>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Size: {item.selectedSize}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">
                        <strong>Price:</strong> ${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <p><strong>Total:</strong> ${total}</p>
              <button onClick={handleOrder} className="btn btn-primary w-100">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
