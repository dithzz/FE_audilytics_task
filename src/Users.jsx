import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@material-ui/core";
import Sidebar from "./components/sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ActionTypes } from "./redux/constants/actionTypes";
import { toast } from "react-toastify";
import { getAllUsers } from "./redux/actions/userActions";

export const Users = (props) => {
  const navigate = useNavigate();
  const authUserData = useSelector((state) => state.auth?.authUserData?.data);
  const userData = useSelector((state) => state.auth?.authUserData);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users?.allUsers);

  console.log(allUsers, "allUsers");

  const [tableData, setTableData] = useState();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  useEffect(() => {
    dispatch(getAllUsers(authUserData));
  }, []);

  useEffect(() => {
    if (!authUserData?.tokens?.access?.token) {
      navigate("/");
    }
  }, []);

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <div className="backgroundContent">
      <div style={{ display: "flex" }}>
        <Sidebar />{" "}
        <TableContainer sx={{ p: 5 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email/Username</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers &&
                allUsers?.results.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Link to={`/users/${row?.id}`}>
                        {row?.firstName + " " + row?.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row?.mobile}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      {row.isApproved ? "Approved" : "Not Approved"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>{" "}
    </div>
  );
};
