import axios from "axios";

export const TokenSignIn = async (data) => {
  const url = "/api/sign-in";
  try {
    const response = await axios.post(url, data);

    // 

    return response.data;

  } catch (error) {
//     if (error.response && error.response.status === 500) {
//       alert("Email and password not found!");
//     }
//     // console.log(error);
    alert(error.response.data + "Please wait for verification");
    return null;
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
