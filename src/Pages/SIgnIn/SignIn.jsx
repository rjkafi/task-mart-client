import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner";

const SignIn = () => {
  const { signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const { displayName: name, email, photoURL, uid } = result.user;

      const userInfo = {
        name,
        email,
        image: photoURL,
        UserID: uid,
        timestamp: Date.now(),
      };

      const dbResponse = await axiosPublic.post("/users", userInfo);

      if (dbResponse.data.insertedId) {
        toast.success("You are logged in successfully. Welcome!");
        navigate(from, { replace: true });
      } else if (dbResponse.data.message === "User already exists") {
        toast.success("Welcome back! You are already logged in.");
        navigate(from, { replace: true });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Google Sign-in Error:", err);
      toast.error("Google Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8 border border-white/40">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Welcome to TaskMart!
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-3 border border-gray-300 bg-white py-3 px-4 rounded-lg mt-6 shadow-md hover:bg-gray-950 transition-all duration-300 cursor-pointer text-lg font-semibold text-gray-900 hover:text-white"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
