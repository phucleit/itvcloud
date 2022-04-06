import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Link,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";

export default function RolesPage () {
  var classes = useStyles();

  const [data, setData] = useState([]);
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/role');
    setData(result.data.data);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Tên nhóm', width: 250 },
    { field: 'description', headerName: 'Mô tả', width: 650 },
  ];

  return (
    <>
      <PageTitle title="Nhóm người dùng" button={(
        <Link to="/app/new-role">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            Thêm mới
          </Button>
        </Link>
      )} />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.rolesData}
      />
    </>
  );
}
