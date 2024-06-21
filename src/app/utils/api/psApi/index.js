import axios from "axios";
import React, { useState } from "react";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWVmNmNjMTAtOWI1NS00ZGMzLTkzYWYtNGJkZGE5Y2VkMjk4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE5MTMxMjUxfQ.nu2UuEhDNE9ypFEUfIh0RNc00XAJVb0IqIu1fjcr4Zg";

// const authToken =
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmMwNzI5MDAtNzhiNy00NTJkLTk0NzAtZWIzYTJmZTFhZGE4Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4OTcyNDM3fQ.IOpQkZ-r2_3Xqs5-FH_hzJVT8agyBV1MPUhk3ip5_N4";

export const fetchPaymentStatusList = async () => {
  const url = "/api/payment-status-list";
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

export const fetchPaymentStatusDetail = async (ps_id) => {
  const url = "/api/payment-data/";
  try {
    const response = await axios.get(url + `${ps_id}`, {
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

export const editAdjustmentApi = async (adjForm, adj_id,psID) => {
  const url = "/api/edit-adjustment/";
  try {
    const response = await axios.put(url + `${adj_id}`, adjForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("adjustment updated!");
    location.reload("/paymentStatus/"+`${psID}`)

    return response.data;
  } catch (error) {
    console.log(error);
    alert("adjustment update failed");
    throw error;
  }
};

export const addAdjustmentApi = async (adjForm,adj_id,psID) => {
  const url = "/api/add-adjustment/";
  try {
    const response = await axios.post(url+ `${adj_id}`, adjForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("adjustment added!");
    location.reload("/paymentStatus/"+`${psID}`)

    return response.data;
  } catch (error) {
    console.log(error);
    alert("adjustment creation failed");
    throw error;
  }
};


export const editPaymentApi = async (payForm, pay_id,psID) => {
  const url = "/api/edit-payment/";
  try {
    const response = await axios.put(url + `${pay_id}`, payForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("payment updated!");
    location.reload("/paymentStatus/"+`${psID}`)

    return response.data;
  } catch (error) {
    console.log(error);
    alert("payment update failed");
    throw error;
  }
};

export const addPaymentApi = async (payForm,psID) => {
  const url = "/api/add-payment";
  try {
    const response = await axios.post(url, payForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("payment added!");
    location.reload("/paymentStatus/"+`${psID}`)

    return response.data;
  } catch (error) {
    console.log(error);
    alert("payment creation failed");
    throw error;
  }
};



export const createPaymentStatusApi = async (psForm) => {
  const url = "/api/create-new-payment-status";
  try {
    const response = await axios.post(url, psForm, {
      headers: {
        Authorization: authToken,
      },
    });

    alert("Payment Status Sucessfully Created!");
    window.location.replace("/paymentStatus");

    return response.data;
  } catch (error) {
    console.log(error);
    alert("Payment Status failed to be created");
    throw error;
  }
};

export const deletePaymentStatus = async (ps_id) => {
  const url = "/api/delete-payment-status/";
  try {
    const response = await axios.delete(url + `${ps_id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    location.reload("/paymentStatus");
    alert("Payment Status Deleted!");
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
};
