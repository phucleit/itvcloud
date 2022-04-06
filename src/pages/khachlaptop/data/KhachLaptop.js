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

const url__khach_laptop = `https://624d0001d71863d7a8125b73.mockapi.io/khachlaptop/`;

export default function KhachLaptopPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadKhachLaptop();
  }, []);

  const loadKhachLaptop = async () => {
    const result = await axios.get('https://624d0001d71863d7a8125b73.mockapi.io/khachlaptop');
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url__khach_laptop + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 200 },
    { field: 'loaimay', headerName: 'Loại máy', width: 150 },
    { field: 'tinhtrangmay', headerName: 'Tình trạng máy', width: 250 },
    { field: 'chiphi', headerName: 'Chi phí', width: 150 },
    { field: 'trangthai', headerName: 'Trạng thái', width: 200 },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-khach-laptop/" + params.row.id}>
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
      <PageTitle title="Danh sách khách laptop" button={(
        <Link to="/app/them-khach-laptop">
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
