import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="sign-in-container" style={{
      display: "grid",
      placeItems: "center",
      height: "100vh"
    }}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
