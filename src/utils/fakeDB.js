import Cookies from "js-cookie";

const useCart = (products) => {
  // console.log(products);
  const getStoredCart = () => {
    // ! Cookie
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

    const foundProducts = storedCart?.map((item) => {
      const product = products?.find((product) => product._id === item._id);
      return {
        ...product,
        _id: item._id,
        size: item.size,
        quantity: item.quantity,
      };
    });
    // console.log("storedCart", storedCart);
    // console.log("foundProducts", foundProducts);
    return foundProducts; // products with all the product info
  };
  const addToCart = (selectedProduct) => {
    // the remaining products in the cart
    if (Array.isArray(selectedProduct)) {
      const remainingProducts = selectedProduct.map((item) => {
        return {
          _id: item._id,
          size: item.size,
          quantity: item.quantity,
        };
      });
      // console.log("remainingProducts", remainingProducts);

      localStorage.setItem("shopping-cart", JSON.stringify(remainingProducts));
    } else {
      const cart = JSON.parse(localStorage.getItem("shopping-cart")) || [];
      let updatedCart;
      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(
        (item) =>
          item._id === selectedProduct._id && item.size === selectedProduct.size
      );

      if (existingProductIndex !== -1) {
        // Product already exists in the cart
        const existingProduct = cart[existingProductIndex];
        existingProduct.quantity += 1;
        updatedCart = [...cart];
      } else {
        // Product doesn't exist in the cart
        const productWithQuantity = {
          _id: selectedProduct?._id,
          size: selectedProduct?.size,
          quantity: 1,
        };
        updatedCart = [...cart, productWithQuantity];
      }
      // ! Cookie
      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    }
  };

  return { addToCart, getStoredCart };
};

const removeFromDb = (_id, size) => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (_id in shoppingCart) {
      delete shoppingCart[_id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
};

export { removeFromDb, deleteShoppingCart, useCart };
