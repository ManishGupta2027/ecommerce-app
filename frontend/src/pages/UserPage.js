import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login if the user is not logged in
      return;
    }

    // Fetch orders for the logged-in user from the server
    axios.get(`http://localhost:5000/api/orders/${user.id}`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no previous orders.
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.orderId} className="card mb-4">
              <div className="card-header">
                <h3>Order #{order.orderId}</h3>
                <p className="mb-0">Date: {order.date}</p>
                <p className="mb-0">Status: {order.status}</p>
                <h5 className="mt-2">Total: ${order.total}</h5>
              </div>
              <div className="card-body">
                <h4 className="mb-3">Items:</h4>
                <ul className="list-group">
                  {order.items.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <strong>Product ID:</strong> {item.productId} <br />
                      <strong>Size:</strong> {item.size} <br />
                      <strong>Quantity:</strong> {item.quantity} <br />
                      <strong>Price:</strong> ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
