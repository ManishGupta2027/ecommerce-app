import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>ShopName</h5>
            <p>Leading e-commerce platform to purchase your favorite products online.</p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/shop" className="text-white">Shop</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Have any questions? Reach out to us at:</p>
            <ul className="list-unstyled">
              <li>Email: support@shopname.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
