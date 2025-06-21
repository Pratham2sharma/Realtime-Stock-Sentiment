import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import { useUserStore } from "./store/useUserStore"
import LoadingSpinner from "./components/LoadingSpinner"
import { useEffect } from "react"
import StockPage from "./pages/StockPage"
import AboutPage from "./pages/AboutPage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"


function App() {

  const {user , checkingAuth, checkAuth , refreshToken} = useUserStore();

   useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //  useEffect(() => {
  //   refreshToken();
  // }, []);

 if (checkingAuth) return <LoadingSpinner />;
  return (

    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      
      <div>
        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/login" />}/>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

            <Route path="/stock" element={user ? <StockPage /> : <Navigate to="/login" />} />
            <Route path="/about" element={<AboutPage />} />

          </Routes>
          <Toaster />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
