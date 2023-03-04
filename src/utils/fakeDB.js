// use local storage to manage cart data
const addToDb = (_id, prevSize) => {
  let shoppingCart = {};
  //get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  // add quantity
  const product = shoppingCart[_id];
  // const quantity = product[0];
  // const size = product[1];
  if (product&& product[1] === prevSize) {
    console.log("exist");
    const newQuantity = product[0] + 1;
    shoppingCart[_id][0] = newQuantity;
  } else {
    shoppingCart[_id] = [1, prevSize];
    // console.log(shoppingCart);
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
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

export { addToDb, getStoredCart, removeFromDb, deleteShoppingCart };
