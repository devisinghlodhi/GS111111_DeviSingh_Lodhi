import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StorePage from "./pages/Store/Store";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Layout from "./pages/Layout";
import Store from "./pages/Store/Store";
import Sku from "./pages/Sku/Sku";
import Planning from "./pages/Planning/Planning";
import Charts from "./pages/Charts/Charts";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route path="/" element={<><SignedIn><Layout><Store /></Layout></SignedIn> <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut></>} />
          <Route path="/store" element={<SignedIn><Layout><Store /></Layout></SignedIn>} />
          <Route path="/sku" element={<SignedIn><Layout><Sku /></Layout></SignedIn>} />
          <Route path="/planning" element={<SignedIn><Layout><Planning /></Layout></SignedIn>} />
          <Route path="/charts" element={<SignedIn><Layout><Charts /></Layout></SignedIn>} />

          {/* Redirect Unauthenticated Users */}
          <Route
            path="*"
            element={
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            }
          />
        </Routes>
      </Router>
    
  );
}
