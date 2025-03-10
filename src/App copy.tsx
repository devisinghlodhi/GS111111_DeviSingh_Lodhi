import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import Layout from "./pages/Layout";
import LoginPage from "./pages/login/Login";
import Store from "./pages/Store/Store";
import Sku from "./pages/Sku/Sku";
import Planning from "./pages/Planning/Planning";
import Charts from "./pages/Charts/Charts";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";


const App: React.FC = () => {
  return (
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
{/* 
          <Route element={<ProtectedRoute />}>
            <Route path="/store" element={<Store />} />
          </Route> */}

          <Route path="/" element={<LoginPage />} />
          <Route path="/store" element={<ProtectedRoute><Layout><Store /></Layout></ProtectedRoute>} />
          <Route path="/sku" element={<ProtectedRoute><Layout><Sku /></Layout></ProtectedRoute>} />
          <Route path="/planning" element={<ProtectedRoute><Layout><Planning /></Layout></ProtectedRoute>} />
          <Route path="/charts" element={<ProtectedRoute><Layout><Charts /></Layout></ProtectedRoute>} />

            {/* Redirect if not signed in */}
            {/* <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          /> */}
        </Routes>
      </BrowserRouter>
  );
};







const ProtectedRoute = () => {
  const { isSignedIn } = useUser();


  if (isSignedIn === undefined) {
    return <div>Loading...</div>; // Fix blank page issue
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};






export default App;
