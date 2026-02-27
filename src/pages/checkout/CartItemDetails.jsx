import axios from "axios";
import { Fragment, useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);

    await loadCart();
  };

  const handleUpdate = async () => {
    if (isUpdating) {
      await axios.put(`api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });

      await loadCart();
    }

    setIsUpdating(!isUpdating);
  };

  const updateCartQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleUpdate();
    else if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  };

  return (
    <Fragment key={cartItem.productId}>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdating ? (
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={updateCartQuantity}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className="quantity-label"> {cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdate}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </Fragment>
  );
}
