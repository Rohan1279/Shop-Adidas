export const setAuthToken = (user, userRole) => {
  console.log(user);
  const currentUser = {
    email: user?.email,
    // userRole,
  };
  // save user in db and get token
  fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // save token in localstorage
      localStorage.setItem("shop-adidas-token", data.token);
    });
};
