import { createContext, useEffect, useState } from "react";

export const CartDataContext = createContext();
const CartContext = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(2300);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartData(JSON.parse(savedCart));
    } else {
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  return (
    <div>
      <CartDataContext.Provider
        value={[cartData, setCartData, total, setTotal]}
      >
        {children}
      </CartDataContext.Provider>
    </div>
  );
};
export default CartContext;
