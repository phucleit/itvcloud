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
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";

const url_service = `http://103.57.222.114:10000/api/service/`;

export default function ServicePage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const result = await axios.get('http://103.57.222.114:10000/api/service');
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_service + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'tengoidv', headerName: 'Tên gói dịch vụ', width: 200 },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-dich-vu/" + params.row.id}>
              <i className="fas fa-edit"></i>
            </Link>
            <DeleteOutline className={classes.userListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (service) =>
        service.tengoidv.toLowerCase().indexOf(query) > -1 ||
        service.tengoidv.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title="Danh sách dịch vụ" button={(
        <Link to="/app/them-dich-vu">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            Thêm mới
          </Button>
        </Link>
      )} />
      <div className={classes.search}>
        <input type="text" className={classes.searchTerm} placeholder="Nhập từ khóa tìm kiếm" onChange={e => setQuery(e.target.value)} />
        <button type="submit" className={classes.searchButton}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <DataGrid
        rows={search(data)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.userData}
      />
    </>
  );
}
