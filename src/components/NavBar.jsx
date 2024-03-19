import React, { useState } from "react";

export default function NavBar({ user }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [itemsInCart, setItemsInCart] = useState(0);

  const handleAddToCart = () => {
    setItemsInCart(itemsInCart + 1);
  };

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Trim whitespace from input fields
    const trimmedShippingAddress = trimInputFields(shippingAddress);
    const trimmedBillingAddress = trimInputFields(billingAddress);
    // Use the addresses for further processing (e.g., sending to backend)
    console.log("Shipping Address:", trimmedShippingAddress);
    console.log("Billing Address:", trimmedBillingAddress);
    // Reset the form and hide it
    setShippingAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setBillingAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setShowCheckoutForm(false);
  };

  const trimInputFields = (address) => {
    const trimmedAddress = {};
    for (let key in address) {
      trimmedAddress[key] = address[key].trim();
    }
    return trimmedAddress;
  };

  return (
    <>
      {user ? (
        <span>{`Welcome ${user.firstName} ${user.lastName} `}</span>
      ) : (
        <a target="_blank" href="#">Login </a>
      )}
      <span>{itemsInCart > 0 && `${itemsInCart} in your cart`}</span>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleCheckoutClick}>Checkout</button>
      <a target="_blank" href="#home">Home </a>
      <a target="_blank" href="#home">Laptops </a>
      <a target="_blank" href="#contact">Contact </a>
      <a target="_blank" href="#about">About </a>

      {/* Checkout Form */}
      {showCheckoutForm && (
        <form onSubmit={handleFormSubmit}>
          <h2>Checkout</h2>
          <h3>Shipping Address</h3>
          <input
            type="text"
            placeholder="First Name"
            value={shippingAddress.firstName}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={shippingAddress.lastName}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State"
            value={shippingAddress.state}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
            }
          />
          <hr />
          <label>
            <input
              type="checkbox"
              checked={!showCheckoutForm}
              onChange={() => setShowCheckoutForm(!showCheckoutForm)}
            />
            Use shipping address as billing address
          </label>
          {!showCheckoutForm && (
            <>
              <h3>Billing Address</h3>
              <input
                type="text"
                placeholder="First Name"
                value={billingAddress.firstName}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, firstName: e.target.value })
                }
              />
              {/* Add other input fields for billing address */}
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
