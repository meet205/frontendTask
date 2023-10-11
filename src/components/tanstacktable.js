import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../App.css';

const TanstackTable = ({ data }) => {

  return (
    <TableContainer component={Paper} className="solidTable">
      <Table>
        <TableHead>
          <TableRow className="solidTableHeader">
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Phone No.</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>BOD</TableCell>
            <TableCell>Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.result?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.DOB}</TableCell>
              <TableCell>{item.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TanstackTable;
