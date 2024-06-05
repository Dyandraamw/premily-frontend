"use client";
import React, { useState } from "react";

import dayjs from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

function createData(invoice_id, recipient, issued_date, policy_period, amount) {
  return {
    invoice_id,
    recipient,
    issued_date,
    policy_period,
    amount,
  };
}

const rows = [
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "05/07/2024-06/08/2025",
    "$100.00"
  ),
];

export default function TableSelectInvoice({ tableData = rows }) {
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.invoice_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, invoice_id) => {
    const selectedIndex = selected.indexOf(invoice_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoice_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (invoice_id) => selected.indexOf(invoice_id) !== -1;

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

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < tableData.length
                  }
                  checked={
                    tableData.length > 0 && selected.length === tableData.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
              <TableCell align="left">Invoice Number</TableCell>
              <TableCell align="left">Recipient</TableCell>
              <TableCell align="left">Issued Date</TableCell>
              <TableCell align="left">Policy Period</TableCell>
              <TableCell align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              const isItemSelected = isSelected(row.invoice_id);
              const labelId = `enhanced-table-checkbox-${row.invoice_id}`;

              return (
                <TableRow
                  key={row.invoice_id}
                  selected={isItemSelected}
                  role="checkbox"
                  aria-checked={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleClick(event, row.invoice_id)}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" id={labelId}>
                    {row.invoice_id}
                  </TableCell>
                  <TableCell align="left">{row.recipient}</TableCell>
                  <TableCell align="left">{row.issued_date}</TableCell>
                  <TableCell align="left">{row.policy_period}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
