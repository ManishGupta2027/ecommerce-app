import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to continue');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. Add items to proceed!
        </div>
      ) : (
        <div>
          <div className="list-group">
            {cart.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} className="img-thumbnail" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                  <div>
                    <h5>{item.name}</h5>
                    <p className="mb-1">Size: {item.selectedSize}</p>
                    <p className="mb-1">Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="d-flex justify-content-between mt-4">
            <h4>Total: ${calculateTotal()}</h4>
            <button className="btn btn-primary" onClick={handleBuyNow}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
