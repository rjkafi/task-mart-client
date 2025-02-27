import { useState, useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [dataLoading, setDataLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    //  data fetch
    if (user && user?.email) {
      setTimeout(() => {
        setDataLoading(false);
      }, 1000);
    } else {
      setDataLoading(false);
    }
  }, [user]);

  console.log(location);

  if (loading || dataLoading) {
    return <LoadingSpinner />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/signIn"} />;
};

export default PrivateRoute;
