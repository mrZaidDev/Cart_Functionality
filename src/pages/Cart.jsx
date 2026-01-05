import React, { useContext, useEffect, useState } from "react";
import { CartDataContext } from "../context/CartContext";
import { CircleX } from "lucide-react";
import DiscountCodes from "../components/DiscountCodes";

const Cart = () => {
  const [cartData, setCartData] = useContext(CartDataContext);
  const [couponMessage, setCouponMessage] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(200);
  const [finalTotal, setFinalTotal] = useState(0);
  const [tax, setTax] = useState(0);
  

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartData.reduce((acc, current_value) => {
        return acc + current_value.price * current_value.quantity;
      }, 0);
      setTotal(total);
    };
    calculateTotal();
  }, [cartData]);

  useEffect(() => {
    setFinalTotal(Math.floor(total * 1.02 - discount + shipping));
  }, [total,discount,shipping]);

  const discountValidation = (couponCode, total) => {
    const foundCouponCode = DiscountCodes.find(
      (coupon) => coupon.code === couponCode
    );
    if (!foundCouponCode) {
      setCouponMessage({ message: "invalid coupon" });
      return;
    }
    if (!foundCouponCode.active) {
      setCouponMessage({ message: "invalid coupon" });
      return;
    }
    if (foundCouponCode.type === "percentage") {
      setIsCouponApplied(true);
      setCouponMessage({ message: "coupon applied" });
      const CouponDiscount = Math.floor((foundCouponCode.value / 100) * total);
      setDiscount(CouponDiscount);
    } else if (foundCouponCode.type === "fixed") {
      setIsCouponApplied(true);
      setCouponMessage({ message: "coupon applied" });
      setDiscount(foundCouponCode.value);
    } else if (foundCouponCode.type === "shipping") {
      setIsCouponApplied(true);
      setCouponMessage({ message: "coupon applied" });
      setShipping(0);
    }

    // setDiscount(foundCouponCode.maxDiscount)
    // setCouponMessage({ message: "Coupon Applied" });
  };

  const handleRemoveFromCart = (e) => {
     setIsCouponApplied(false);
    setCouponCode("")
    setCouponMessage({ message: "" });
    setDiscount(0)
    setShipping(200)
    const removeFromCartProduct = e;
    const FilteredProducts = cartData.filter(
      (e) => e.id !== removeFromCartProduct.id
    );
    setCartData(FilteredProducts);
  };

  const handleQuantityDecrease = (e) => {
     setIsCouponApplied(false);
    setCouponCode("")
    setCouponMessage({ message: "" });
    setDiscount(0)
    setShipping(200)
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
     setIsCouponApplied(false);
    setCouponCode("")
    setCouponMessage({ message: "" });
    setDiscount(0)
    setShipping(200)
    const increaseProductQuantity = e;
    const index = cartData.findIndex(
      (item) => item.id === increaseProductQuantity.id
    );
    const shallowCartData = [...cartData];
    increaseProductQuantity.quantity += 1;
    shallowCartData.splice(index, 1, increaseProductQuantity);
    return setCartData(shallowCartData);
  };

  const handleCouponCode = (e) => {
    setCouponMessage({message:""})
    setIsCouponApplied(false)
    setDiscount(0)
    setShipping(200)
    setCouponCode(e.target.value);
  };
  const handleCouponRemoving = () => {
    setIsCouponApplied(false);
    setCouponCode("")
    setCouponMessage({ message: "Coupon is unapplied" });
    setDiscount(0)
    setShipping(200)

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
                  <p className="font-medium text-lg hidden md:block">
                    {e.name}
                  </p>
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
                    Quantity{" "}
                    <span className="text-black font-[20px]">{e.quantity}</span>
                  </p>
                  <button
                    className="bg-gray-300 px-2 py-0 rounded"
                    onClick={() => handleQuantityIncrease(e)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-700 text-[20px] font-bold mt-1 ml-4">
                  Rs.{e.price}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side – Summary */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 h-fit ">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col justify-between font-semibold mb-8">
            <div className="flex items-center justify-between">
              <label htmlFor="">Apply Coupon</label>
              <input
                value={couponCode}
                onChange={handleCouponCode}
                type="text"
                className="border"
              />
            </div>
            <div>
              {couponMessage && (
                <p
                  className={`${
                    isCouponApplied ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {couponMessage.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => discountValidation(couponCode, total)}
                className="bg-gray-300 px-2 font-semibold rounded w-20"
              >
                Apply
              </button>
              {isCouponApplied && (
                <button
                  onClick={handleCouponRemoving}
                  className="bg-gray-300 px-2 font-semibold rounded "
                >
                  Remove Coupon
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Sub Total</span>
            <span>Rs. {total}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Discount</span>
            <span>Rs. {discount}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tax</span>
            <span>2%</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{finalTotal}</span>
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
