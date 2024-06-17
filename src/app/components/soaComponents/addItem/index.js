"use client";
import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs, { Dayjs } from "dayjs";

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

export default function AddItem({
  tableData,
  handleRadioChange,
  selectedValue,
}) {
    // const [selectedValue, setSelectedValue] = useState(0);

    // const handleRadioChange = (event) => {
    //   setSelectedValue(event.target.value);
    // };
    const handleStartPeriod = (data) => {
      if (data!=null) {
        const start = dayjs(data.slice(0,10)).format('DD/MM/YYYY')
        return start
      }
      return
    };
  
    const handleEndPeriod = (data) => {
      if (data!=null) {
        const end = dayjs(data.slice(13,23)).format('DD/MM/YYYY')
        return end
      }
      return
    };

  console.log(selectedValue);
  return (

    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Invoice Number</TableCell>
              <TableCell align="left">Recipient</TableCell>
              <TableCell align="left">Issued Date</TableCell>
              <TableCell align="left">Policy Period</TableCell>
              <TableCell align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Radio
                    checked={row.Invoice_ID == selectedValue}
                    onChange={handleRadioChange}
                    value={row.Invoice_ID}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Invoice_ID}
                </TableCell>
                <TableCell align="left">{row.Recipient}</TableCell>
                <TableCell align="left">{dayjs(row.Created_At).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="left">
                  {handleStartPeriod(row.Period)} - {handleEndPeriod(row.Period)}
                </TableCell>
                <TableCell align="left">{row.Total_Premium_Due}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
