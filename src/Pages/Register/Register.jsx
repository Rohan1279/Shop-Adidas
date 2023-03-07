import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { FaAppStore, FaGithub, FaGoogle } from "react-icons/fa";
import { Context } from "../../contexts/ContextProvider";
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const Register = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile } = authInfo;
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen">
      <FaGoogle
        onClick={() => handleAuthenticate(googleProvider)}
        className="text-6xl bg-secondary-color shadow-nm p-2 rounded-full mx-auto"
      ></FaGoogle>
    </div>
  );
};

export default Register;
