import axios from "axios";

export const TokenSignIn = async (data) => {
  const url = "/api/sign-in";
  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      const { isVerified } = response.data;
      if (isVerified) {
        window.location("/dashboard");
      } else {
        alert("Your account is not verified. Please verify your account.");
        location.reload("/SignIn");
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      alert("Email and password not found!");
    }
    // console.log(error);
    // alert("Statement of Account failed to be created");
    throw error;
  }
};

export const FetchSignUp = async (data) => {
  const url = "/api/sign-up";
  try {
    const response = await axios.post(url, data);
    alert("Your account has been created, please wait for verification user");
    window.location.replace("/SignIn");
    console.log("data API", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status == 400) {
      alert(
        "Image should be insert & password contains 8 characters having an uppercase, lowercase, and symbols (@#$) "
      );
    }
    throw error;
    // throw error;
  }
};
