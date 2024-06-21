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
  //   const [selectedValue, setSelectedValue] = useState(0);

  //   const handleRadioChange = (event) => {
  //     setSelectedValue(event.target.value);
  //   };

  console.log(selectedValue);
  return (
    // <div>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     hideFooterPagination={isLoading}
    //     pageSizeOptions={[5]}

    //   />
    //   <div >
    //     You have selected: {selectedValue[0].firstName} {selectedValue[0].lastName}
    //   </div>
    // </div>
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
                    checked={row.invoice_id == selectedValue}
                    onChange={handleRadioChange}
                    value={row.invoice_id}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.invoice_id}
                </TableCell>
                <TableCell align="left">{row.recipient}</TableCell>
                <TableCell align="left">{row.issued_date}</TableCell>
                <TableCell align="left">
                  {row.start_date}-{row.end_date}
                </TableCell>
                <TableCell align="left">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
