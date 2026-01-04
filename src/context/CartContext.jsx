import { createContext, useEffect, useState } from "react";

export const CartDataContext = createContext();
const CartContext = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartData(JSON.parse(savedCart));
    } else {
      console.log("No cart data found");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
    console.log("cart data saved");
  }, [cartData]);

  return (
    <div>
      <CartDataContext.Provider value={[cartData, setCartData]}>
        {children}
      </CartDataContext.Provider>
    </div>
  );
};
export default CartContext;
