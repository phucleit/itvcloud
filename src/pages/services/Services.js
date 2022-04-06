import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {
  Link,
} from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "./styles";

const url_service = `https://backend.omcloud.vn/api/service/`;

export default function ServicesPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if(window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_service + id)
      .then(res => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên dịch vụ', width: 250 },
    { 
      field: 'service_type', 
      headerName: 'Loại dịch vụ', 
      width: 250, 
      valueGetter: (params) => `${params.row.service_type.name}` 
    },
    { field: 'construction_count', headerName: 'Số lượng công trình', width: 200 },
    { 
      field: 'hanhDong', 
      headerName: 'Hành động', 
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/services/"+params.row.id}>
              <button className={classes.serviceListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.serviceListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  return (
    <>
      <PageTitle title="Danh sách dịch vụ" button={(
        <Link to="/app/new-service">
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
        className={classes.serviceData}
      />
    </>
  );
}
