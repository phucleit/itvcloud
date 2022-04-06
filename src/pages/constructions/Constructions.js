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

const url_construction = `https://backend.omcloud.vn/api/construction/`;

export default function ConstructionsPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadConstruction();
  }, []);

  const loadConstruction = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/construction');
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if(window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_construction + id)
      .then(res => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên công trình', width: 250 },
    { 
      field: 'service_id', 
      headerName: 'Dịch vụ', 
      width: 200, 
      valueGetter: (params) => `${params.row.service.name}` 
    },
    { field: 'address', headerName: 'Địa điểm', width: 300 },
    { 
        field: 'service_type', 
        headerName: 'Loại dịch vụ', 
        width: 150,
        valueGetter: (params) => `${params.row.service_type.name}` 
    },
    { 
      field: 'hanhDong', 
      headerName: 'Hành động', 
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/constructions/"+params.row.id}>
              <button className={classes.constructionListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.constructionListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  return (
    <>
      <PageTitle title="Danh sách công trình" button={(
        <Link to="/app/new-construction">
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
        className={classes.constructionData}
      />
    </>
  );
}
