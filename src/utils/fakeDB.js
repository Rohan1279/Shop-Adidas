import Cookies from "js-cookie";
import { useState } from "react";

// use local storage to manage cart data
const addToDb = (cart) => {
  // ! PREVIOUS CODE STARTS
  // let shoppingCart = {};
  // //get the shopping cart from local storage
  // const storedCart = localStorage.getItem("shopping-cart");
  // if (storedCart) {
  //   shoppingCart = JSON.parse(storedCart);
  // }
  // // console.log(shoppingCart);
  // // add quantity
  // const product = shoppingCart[_id];
  // // const quantity = product[0];
  // // const size = product[1];
  // if (product && shoppingCart[_id][1] === prevSize) {
  //   console.log(product);
  //   const newQuantity = product[0] + 1;
  //   shoppingCart[_id][0] = newQuantity;
  // } else {
  //   const newProductId = _id;
  //   shoppingCart[newProductId] = [1, prevSize];
  //   // console.log(shoppingCart);
  // }
  // localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  // ! PREVIOUS CODE ENDS
  // let shoppingCart = [];
  // const selectedProduct = { _id, size, quantity };
  // shoppingCart.push(selectedProduct);
  // localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  // console.log(shoppingCart);
  Cookies.set("shopping-cart", JSON.stringify(cart));
};
const useCart = (products) => {
  // console.log(products);
  const getCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

    const foundProducts = storedCart?.map((item) => {
      const product = products?.find((product) => product._id === item._id);
      return { ...product, size: item.size, quantity: item.quantity };
    });
    // console.log(foundProducts);
    return foundProducts;
  };
  const setCart = (selectedProduct) => {
    const cart = getCart();
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
    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
  };

  return { cart: getCart(), setCart };
};

const getStoredCart = () => {
  let shoppingCart = {};
  //get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
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

export { addToDb, getStoredCart, removeFromDb, deleteShoppingCart, useCart };
