import axios from "axios";
import React, { useState } from "react";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzI0ZTdiODEtMzQ0MS00MGI2LThiZjgtZTU0NDFlMjNlZTVlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4NjM3MjI2fQ.-Bq4dPdBWjUa9cB-2IlF8W6oKieB0SCC_PXx0IcRh-Y";

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

export const deleteInvoice = async (invoice_id) => {
  const url = "/api/delete-invoices/";
  try {
    // const response = await axios.get(url + `${invoice_id}`, {
    //   headers: {
    //     Authorization: authToken,
    //   },
    // });

    // return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
