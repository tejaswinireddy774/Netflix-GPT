import React from "react";
import background from "../Utils/background.png";
import netflix_logo from "../Utils/netflix_logo.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckValidate } from "../Utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Name = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);

  
  const handelButtonClick = () => {
    const message = CheckValidate(
      Name.current?.value,
      Email.current?.value,
      Password.current?.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        Email.current?.value,
        Password.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: Name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        Email.current?.value,
        Password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browser");
      } else {
        dispatch(removeUser());
        navigate("/login")
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [dispatch, navigate]);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div
  className="relative bg-cover bg-center w-full min-h-screen"
  style={{
    backgroundImage: `url(${background})`,
  }}
>
  <div className="bg-black bg-opacity-65 w-full min-h-screen flex flex-col">
    <nav className="px-4 sm:px-6 py-4">
      <img
        src={netflix_logo}
        alt="Netflix Logo"
        className="h-[50px] w-[120px] sm:h-[60px] sm:w-[150px] md:h-[70px] md:w-[170px] lg:h-[80px] lg:w-[186px]"
      />
    </nav>

    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw] 
                 p-6 sm:p-8 md:p-10 
                 bg-black bg-opacity-70 rounded-md 
                 mx-auto mt-10 sm:mt-16 md:mt-20 mb-10"
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-[34px] p-2 mb-2 font-bold text-center md:text-left">
        {isSignInForm ? "Sign In" : "Sign Up"}
      </h1>

      {!isSignInForm && (
        <div className="relative border-none rounded-md m-3">
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name"
            ref={Name}
            required
            className="peer placeholder-transparent bg-[rgba(26,25,25,0.8)] 
                       text-white px-4 sm:px-6 pt-4 pb-2 
                       border border-gray-400 rounded-md 
                       focus:outline-none focus:border-gray-600 w-full text-sm sm:text-base"
          />
          <label
            htmlFor="Name"
            className="absolute left-3 sm:left-4 text-gray-400 transition-all
                       peer-placeholder-shown:top-1
                       peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base
                       peer-placeholder-shown:text-gray-400
                       peer-focus:top-1
                       peer-focus:text-xs
                       peer-focus:text-gray-400
                       peer-focus:left-4 sm:peer-focus:left-6
                       peer-focus:font-semibold"
          >
            Name
          </label>
        </div>
      )}

      <div className="relative border-none rounded-md m-3">
        <input
          type="email"
          id="Email"
          name="Email"
          placeholder="Email address"
          ref={Email}
          required
          className="peer placeholder-transparent bg-[rgba(26,25,25,0.8)] 
                     text-white px-4 sm:px-6 pt-4 pb-2 
                     border border-gray-400 rounded-md 
                     focus:outline-none focus:border-gray-600 w-full text-sm sm:text-base"
        />
        <label
          htmlFor="email"
          className="absolute left-3 sm:left-4 text-gray-400 transition-all
                     peer-placeholder-shown:top-1
                     peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base
                     peer-focus:top-1
                     peer-focus:text-xs
                     peer-focus:text-gray-400
                     peer-focus:left-4 sm:peer-focus:left-6
                     peer-focus:font-semibold"
        >
          Email address
        </label>
      </div>

      <div className="relative border-none rounded-md m-3">
        <input
          type="password"
          id="Password"
          name="Password"
          placeholder=" "
          required
          ref={Password}
          className="peer placeholder-transparent bg-[rgba(26,25,25,0.8)] 
                     text-white px-4 sm:px-6 pt-4 pb-2 
                     border border-gray-400 rounded-md 
                     focus:outline-none focus:border-gray-600 w-full text-sm sm:text-base"
        />
        <label
          htmlFor="Password"
          className="absolute left-3 sm:left-4 text-gray-400 transition-all
                     peer-placeholder-shown:top-1
                     peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base
                     peer-focus:top-1
                     peer-focus:text-xs
                     peer-focus:text-gray-400
                     peer-focus:left-4 sm:peer-focus:left-6
                     peer-focus:font-semibold"
        >
          Password
        </label>
      </div>

      <p className="text-red-500 font-bold text-sm sm:text-base md:text-lg py-2">
        {errorMessage}
      </p>

      <button
        onClick={handelButtonClick}
        className="w-full bg-[#e80c25] hover:bg-[#c22436] 
                   text-white font-medium rounded-md 
                   py-2 text-base sm:text-lg shadow-md 
                   transition duration-300"
      >
        {isSignInForm ? "Sign In" : "Sign Up"}
      </button>

      <p
        className="py-3 sm:py-4 cursor-pointer text-white text-sm sm:text-base text-center md:text-left"
        onClick={toggleSignInForm}
      >
        {isSignInForm
          ? "New to Netflix? Sign Up Now"
          : "Already registered? Sign In Now."}
      </p>

      <p className="py-3 sm:py-4 cursor-pointer text-white text-xs sm:text-sm md:text-base text-center md:text-left leading-relaxed">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        <br className="hidden sm:block" />
        <Link to="/login" className="text-blue-500 underline">
          Learn more.
        </Link>
      </p>
    </form>

    <div className="h-2"></div>
  </div>
</div>
  );
};

export default Login;
