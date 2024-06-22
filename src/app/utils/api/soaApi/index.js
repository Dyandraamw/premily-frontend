import axios from "axios";
import Cookies from "js-cookie";

// const authToken =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWVmNmNjMTAtOWI1NS00ZGMzLTkzYWYtNGJkZGE5Y2VkMjk4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE5MTMxMjUxfQ.nu2UuEhDNE9ypFEUfIh0RNc00XAJVb0IqIu1fjcr4Zg";

// const authToken =
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmMwNzI5MDAtNzhiNy00NTJkLTk0NzAtZWIzYTJmZTFhZGE4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4OTcyNDM3fQ.IOpQkZ-r2_3Xqs5-FH_hzJVT8agyBV1MPUhk3ip5_N4";
const authToken = Cookies.get("jwtToken")

export const fetchSoaList = async () => {
  const url = "/api/retrive-soa";
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

export const fetchSoaDetails = async (soa_id) => {
    const url = "/api/get-items-list/";
    try {
      const response = await axios.get(url + `${soa_id}`, {
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

export const createSoa = async (soaForm) => {
  const url = "/api/create-soa";
  try {
    const response = await axios.post(url, soaForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("Statement of Account Sucessfully Created!");
    location.reload("/soaList");

    return response.data;
  } catch (error) {
    console.log(error);
    alert("Statement of Account failed to be created");
    throw error;
  }
};

export const addItemApi = async (soa_id,itemForm) => {
  const url = "/api/add-items/";
  try {
    const response = await axios.post(url + `${soa_id}`, itemForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("Item Successfully Added!");

    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
};

export const editItemApi = async (soa_det_id,itemForm) => {
  const url = "/api/edit-items/";
  try {
    const response = await axios.put(url + `${soa_det_id}`, itemForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("Item Successfully Edited!");
    location.reload("/soaList/"+soa_det_id)
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
};

export const deleteSoa = async (soa_id) => {
  const url = "/api/delete-soa/";
  try {
    const response = await axios.delete(url + `${soa_id}`, {
      headers: {
        Authorization: authToken,
      },
    });

    alert(response.data);
    location.reload("/soaList");

    return response.data;
  } catch (error) {
    console.log(error);
    alert("Statement of Account failed to be deleted");
    throw error;
  }
};

