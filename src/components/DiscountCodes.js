  const discountCodes = [
  {
    code: "SAVE10",
    description: "10% off on orders above Rs. 5,000",
    type: "percentage",
    value: 10,
    minPurchase: 5000,
    active: true
  },
  {
    code: "FLAT500",
    description: "Rs. 500 off on orders above Rs. 2,000",
    type: "fixed",
    value: 500,
    minPurchase: 2000,
    active: true
  },
  {
    code: "FREESHIP",
    description: "Free shipping on all orders",
    type: "shipping",
    value: 0,
    minPurchase: 0,
    active: true
  }
];

export default discountCodes