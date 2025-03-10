
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="sign-in-container" style={{
      display: "grid",
      placeItems: "center",
      height: "100vh"
    }}>
      <SignIn />
    </div>
  );
};

export default SignInPage;
