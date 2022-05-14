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

const url_khach_laptop = `http://localhost:8000/api/laptop/`;

export default function KhachLaptopPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    loadKhachLaptop();
  }, []);

  const loadKhachLaptop = async () => {
    const result = await axios.get('http://localhost:8000/api/laptop');
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_khach_laptop + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
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

  const search = (rows) => {
    return rows.filter(
      (laptop) =>
        laptop.hoten.toLowerCase().indexOf(query) > -1 ||
        laptop.hoten.indexOf(query) > -1 ||
        laptop.phone.toLowerCase().indexOf(query) > -1 ||
        laptop.phone.indexOf(query) > -1 ||
        laptop.loaimay.toLowerCase().indexOf(query) > -1 ||
        laptop.loaimay.indexOf(query) > -1 ||
        laptop.tinhtrangmay.toLowerCase().indexOf(query) > -1 ||
        laptop.tinhtrangmay.indexOf(query) > -1 ||
        laptop.chiphi.toLowerCase().indexOf(query) > -1 ||
        laptop.chiphi.indexOf(query) > -1 ||
        laptop.trangthai.toLowerCase().indexOf(query) > -1 ||
        laptop.trangthai.indexOf(query) > -1
    );
  }

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
