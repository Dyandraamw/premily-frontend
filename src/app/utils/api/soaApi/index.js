import axios from "axios";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzI0ZTdiODEtMzQ0MS00MGI2LThiZjgtZTU0NDFlMjNlZTVlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4NjM3MjI2fQ.-Bq4dPdBWjUa9cB-2IlF8W6oKieB0SCC_PXx0IcRh-Y";

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

