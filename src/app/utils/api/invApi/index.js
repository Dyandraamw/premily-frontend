import axios from "axios";
import React, { useState } from "react";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzI0ZTdiODEtMzQ0MS00MGI2LThiZjgtZTU0NDFlMjNlZTVlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4OTY5NDA3fQ.BdVavVV-yT1hnZHCy9oAuhVpq4cIuIucxYl9ah9Ds8M";

  // const authToken =
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmMwNzI5MDAtNzhiNy00NTJkLTk0NzAtZWIzYTJmZTFhZGE4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4OTcyNDM3fQ.IOpQkZ-r2_3Xqs5-FH_hzJVT8agyBV1MPUhk3ip5_N4";


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
