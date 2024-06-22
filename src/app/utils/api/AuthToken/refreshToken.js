import axios from "axios";

export const TokenSignIn = async (data) => {
  const url = "/api/sign-in";
  try {
    const response = await axios.post(url, data);

    const res = response.data;

    // if (isVerified) {
    //   // alert("Statement of Account Sucessfully Created!");
    //   window.location("/dashboard");
    // } else {
    //   alert("Your account is not verified. Please verify your account.");
    //   location.reload("/SignIn");
    // }

    return response.data;
  } catch (error) {
    console.log(error);
    // alert("Statement of Account failed to be created");
    // throw error;
    alert(error.response.data + "Please wait for verification!")
    return null
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
    alert("Your account failed to created");
    throw error;
    // throw error;
  }
};

export const fetchUserVerification = async (userID) => {
  const url = "/api/user/";
  try {
    const response = await axios.post(url + `${userID}`);
    // alert("Your account has been created, please wait for verification user");
    // window.location.replace("/SignIn");
    // console.log("data API", response.data);
    //const res = response.data
    return response.data.role;
  } catch (error) {
    alert("Your account failed to created");
    throw error;
    // throw error;
  }
};

