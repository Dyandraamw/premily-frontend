"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "../Modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontFamily: "inherit",
        },
        head: {
          fontWeight: 700,
        },
      },
    },
  },
});

export default function TableStaff({
  tableData,
  onAccept,
  handleOpenDetailStaffAccessModal,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role submitted:", showModal);
    // onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.UserID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Username}
                </TableCell>
                <TableCell align="left">{row.Email}</TableCell>
                <TableCell align="left">{row.Phone}</TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="center">
                  <button
                    onClick={() => onAccept(row)}
                    className="p-2 px-4 border-[3px] mr-3 drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) =>
                      handleOpenDetailStaffAccessModal([
                        row.username,
                        row.email,
                        row.phone,
                      ])
                    }
                    className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-red-600 border-red-600"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        ></Modal>
      </TableContainer>
    </ThemeProvider>
  );
}
