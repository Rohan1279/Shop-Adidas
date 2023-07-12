import Cookies from "js-cookie";

const useCart = (products) => {
  // console.log(products);
  const getCart = () => {
    // ! Cookie
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

    const foundProducts = storedCart?.map((item) => {
      const product = products?.find((product) => product._id === item._id);
      return { ...product, size: item.size, quantity: item.quantity };
    });
    return foundProducts; // products with all the product info
  };
  const setCart = (selectedProduct) => {
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
  };

  return { cart: getCart(), setCart };
};

const removeFromDb = (_id) => {
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
