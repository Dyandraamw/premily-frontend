import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

// const authToken =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWVmNmNjMTAtOWI1NS00ZGMzLTkzYWYtNGJkZGE5Y2VkMjk4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE5MTMxMjUxfQ.nu2UuEhDNE9ypFEUfIh0RNc00XAJVb0IqIu1fjcr4Zg";

  // const authToken =
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmMwNzI5MDAtNzhiNy00NTJkLTk0NzAtZWIzYTJmZTFhZGE4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4OTcyNDM3fQ.IOpQkZ-r2_3Xqs5-FH_hzJVT8agyBV1MPUhk3ip5_N4";

const authToken = Cookies.get("jwtToken")

export const fetchInvoiceList = async () => {
  const url = "/api/invoice-list";
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

export const fetchInvoiceDetail = async (invoice_id) => {
  const url = "/api/invoice/";
  try {
    const response = await axios.get(url + `${invoice_id}`, {
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

export const createInvoiceApi =  async(invForm) => {
  const url = "/api/create-invoices"
  try {
    const response = await axios.post(url, invForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("Invoice Sucessfully Created!");
    window.location.replace("/invoiceList")


    return response.data;
  } catch (error) {
    console.log(error);
    alert("Invoice failed to be created");
    throw error;
  }
}

export const deleteInvoice = async (invoice_id) => {
  const url = "/api/delete-invoices/";
  try {
    const response = await axios.delete(url + `${invoice_id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    location.reload('/invoiceList');
    alert("Invoice Deleted")
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error)
    throw error;
  }
};


export const updateInvoiceApi = async (invForm,invoice_id) => {
  const url = "/api/update-invoices/";
  try {
    const response = await axios.put(url + `${invoice_id}`,invForm, {
      headers: {
        Authorization: authToken,
      },
    });
    alert('invoice successfully updated!')
    window.location.replace("/invoiceList/"+invoice_id)

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};