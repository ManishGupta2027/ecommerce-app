import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedSize(response.data.sizes ? response.data.sizes[0].size : '');
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to continue');
      navigate('/login');
    } else {
      if (!selectedSize) {
        alert('Please select a size!');
        return;
      }

      const selectedProduct = { ...product, selectedSize, quantity };
      dispatch({
        type: 'ADD_TO_CART',
        payload: selectedProduct,
      });
      navigate('/checkout');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }

    const selectedProduct = { ...product, selectedSize, quantity };
    dispatch({
      type: 'ADD_TO_CART',
      payload: selectedProduct,
    });

    alert('Added to Cart!');
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating}</p>

          {/* Size Dropdown */}
          <div className="mb-3">
            <label className="form-label">Select Size</label>
            <select
              className="form-select"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {product.sizes.map((sizeOption) => (
                <option key={sizeOption.size} value={sizeOption.size}>
                  {sizeOption.size} - Available: {sizeOption.quantity}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <button onClick={handleAddToCart} className="btn btn-primary me-2">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="btn btn-success">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
