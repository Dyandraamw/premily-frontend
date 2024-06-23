import axios from "axios";
import Cookies from "js-cookie";
const authToken = Cookies.get("jwtToken");
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
    // window.location.replace("/SignIn");
    console.log("data API", response.data);
    return response.data;
  } catch (error) {
    // if (error.response && error.response.status == 400) {
    //   alert(
    //     "Image should be insert & password contains 8 characters having an uppercase, lowercase, and symbols (@#$) "
    //   );
    // }

    alert(error.response.data);
    // throw error;
    // throw error;
  }
};

export const fetchUserApi = async (userID) => {
  const url = "/api/user/";
  // if (userID == null || userID == undefined) {
  //   window.location.reload();
  // } else {
    try {
      const response = await axios.get(url + `${userID}`, {
        headers: {
          Authorization: authToken,
        },
      });
  
      return response.data;
    } catch (error) {
      if (error.response.status==401) {
        window.location.reload();
      }
      // alert("Your user cannot be fetched");
      console.log(error.response);
      // throw error;
    }
  // }
  
};

export const updateUserPic = async (userID, picForm) => {
  const url = "/api/update-profile-picture/";
  try {
    const response = await axios.put(url + `${userID}`, picForm, {
      headers: {
        Authorization: authToken,
      },
    });

    return response.data;
  } catch (error) {
    alert("Your user cannot be fetched");
    console.log(error);
    // throw error;
  }
};

export const forgotPasswordApi = async (data) => {
  const url = "/api/forgot-password?email=";
  try {
    const response = await axios.post(url + `${data}`);

    //

    return response.data;
  } catch (error) {
    //     if (error.response && error.response.status === 500) {
    //       alert("Email and password not found!");
    //     }
    //     // console.log(error);
    alert(error.response.data);
    return null;
  }
};

export const resetPasswordApi = async (resetToken, newPass) => {
  const url = "/api/reset-password?token=";
  try {
    const response = await axios.post(
      url + `${resetToken}` + "&new_password=" + `${newPass}`
    );

    //

    return response.data;
  } catch (error) {
    //     if (error.response && error.response.status === 500) {
    //       alert("Email and password not found!");
    //     }
    //     // console.log(error);
    alert(error.response.data);
    return null;
  }
};

export const setRoleApi = async (user_id, roleForm) => {
  const url = "/api/set-role/";
  try {
    const response = await axios.post(url + `${user_id}`, roleForm, {
      headers: {
        Authorization: authToken,
      },
    });
    alert(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data);
    return null;
    // throw error;
  }
};

export const verifyUserApi = async (user_id, verForm) => {
  const url = "/api/verify-user/";
  try {
    const response = await axios.post(url + `${user_id}`, verForm, {
      headers: {
        Authorization: authToken,
      },
    });
    alert(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data);
    return null;
    // throw error;
  }
};
