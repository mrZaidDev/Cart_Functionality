import React, { useContext } from "react";
import { CartDataContext } from "../context/CartContext";
import { CircleX } from "lucide-react";

const Cart = () => {
  const [cartData, setCartData] = useContext(CartDataContext);

  const handleRemoveFromCart = (e) => {
    const removeFromCartProduct = e;
    const FilteredProducts = cartData.filter(
      (e) => e.id !== removeFromCartProduct.id
    );
    setCartData(FilteredProducts);
  };

  const handleQuantityDecrease = (e) => {
    const decreaseProductQuantity = e;
    if (decreaseProductQuantity.quantity > 1) {
      const index = cartData.findIndex(
        (item) => item.id === decreaseProductQuantity.id
      );
      const shallowCartData = [...cartData];
      decreaseProductQuantity.quantity -= 1;
      shallowCartData.splice(index, 1, decreaseProductQuantity);
      return setCartData(shallowCartData);
    }
    console.log("What are you doing");
  };

  const handleQuantityIncrease = (e) => {
    const increaseProductQuantity = e;
    const index = cartData.findIndex(
      (item) => item.id === increaseProductQuantity.id
    );
    const shallowCartData = [...cartData];
    increaseProductQuantity.quantity += 1;
    shallowCartData.splice(index, 1, increaseProductQuantity);
    return setCartData(shallowCartData);
  };

  const calculateTotal = () => {
   const total = cartData.reduce((acc,current_value)=>{
        return acc + current_value.price*current_value.quantity
    },0)
    return total
  };

  return (
    <div className="min-h-screen">
      {/* Parent Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side – Products */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {cartData.map((e) => {
            return (
              <div
                key={e.id}
                className="grid grid-cols-2 md:grid-cols-3 items-center md:gap-10 border-t  p-4 mb-4 relative"
              >
                <CircleX
                  className="absolute right-0 top-0 m-3"
                  onClick={() => handleRemoveFromCart(e)}
                />
                <div className="flex items-center gap-1">
                    <img
                  src={e.image}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded"
                />
                  <p className="font-medium text-lg hidden md:block">{e.name}</p>
                </div>
                  {/* Quantity */}
                  <div className="flex my-2 gap-1 mt-8">
                    <button
                      className="bg-gray-300 px-2 py-0 rounded"
                      onClick={() => handleQuantityDecrease(e)}
                    >
                      -
                    </button>
                    <p className="text-sm text-gray-500">
                      Quantity <span className="text-black font-[20px]">{e.quantity}</span>
                    </p>
                    <button
                      className="bg-gray-300 px-2 py-0 rounded"
                      onClick={() => handleQuantityIncrease(e)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 text-[20px] font-bold mt-1 ml-4">Rs.{e.price}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side – Summary */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{calculateTotal()}</span>
          </div>
          <button className="w-full mt-4 bg-black text-white py-2 rounded">
            Checkout
          </button>
        </div>
        {/* Right Side done */}
      </div>
    </div>
  );
};

export default Cart;
