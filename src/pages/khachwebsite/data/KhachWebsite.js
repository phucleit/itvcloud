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

const url_khach_website = `https://624d0001d71863d7a8125b73.mockapi.io/khachwebsite/`;

export default function KhachWebsitePage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadKhachWebsite();
  }, []);

  const loadKhachWebsite = async () => {
    const result = await axios.get('https://624d0001d71863d7a8125b73.mockapi.io/khachwebsite');
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_khach_website + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 180 },
    { field: 'website', headerName: 'Website', width: 250 },
    { field: 'nhanvienphutrach', headerName: 'Nhân viên phụ trách', width: 250 },
    { field: 'trangthai', headerName: 'Trạng thái', width: 180 },
    { field: 'createdAt', headerName: 'Ngày đăng ký', width: 200 },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-khach-website/" + params.row.id}>
              <button className={classes.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.userListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  return (
    <>
      <PageTitle title="Danh sách khách website" button={(
        <Link to="/app/them-khach-website">
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
        className={classes.userData}
      />
    </>
  );
}
