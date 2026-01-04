import React, { useContext, useState } from "react";
import { fakeProducts } from "../components/products.js";
import { CartDataContext } from "../context/CartContext.jsx";

const Products = () => {
  const [cartData, setCartData] = useContext(CartDataContext);
  const [products, setProducts] = useState(fakeProducts);

  const handleAddToCart = (e) => {
    const addToCartProduct = e;
    const index = cartData.findIndex((item) => item.id === e.id);
    if (index == -1) {
      addToCartProduct.quantity = 1;
      return setCartData([...cartData, addToCartProduct]);
    }
    const shallowCartData = [...cartData];
    addToCartProduct.quantity += 1;
    shallowCartData.splice(index, 1, addToCartProduct);
    setCartData(shallowCartData);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              onClick={() => {
                imageClick(product);
              }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-700">
                Rs.{product.price}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-black  text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
