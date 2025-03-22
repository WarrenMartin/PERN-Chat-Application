import { Navigate, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";


function App() {
  const {authUser,setAuthUser,isLoading} =useAuthContext();
  console.log("Auth User",authUser)

  if(isLoading) return null;

  return (
  
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/home"/>}/>
      </Routes>

    </div>
  );
}

export default App;