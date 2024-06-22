import axios from "axios";
import Cookies from "js-cookie";

const authToken = Cookies.get("jwtToken");

export const fetchUnroleUser = async () => {
  const url = "/api/unrole-users";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const fetchSetRole = async () => {
//   const url = "/api/set-role";
//   try {
//     const response = await axios.post(url, {
//       headers: {
//         Authorization: authToken,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const fetchUnverifyUser = async () => {
  const url = "/api/unverified-users";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
