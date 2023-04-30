export const setAuthToken = (user, logOut) => {
  let currentUser = {
    email: user?.email,
    userRole: user?.userRole,
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
      // save token in localstorage
      if (data?.token) {
        localStorage.setItem("shop-adidas-token", data?.token);
        return data?.token;
      } else {
        console.log(data?.message);
        logOut();
      }
    })
    .catch((error) => console.log(error));
};
