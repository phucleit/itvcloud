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

const url_khach_laptop = `http://103.57.222.114:10000/api/laptop/`;

export default function KhachLaptopPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');
  const [filterStatus, setFilterStatus] = useState([]);
  const [statusName, setStatusName] = useState('');

  useEffect(() => {
    loadKhachLaptop();
  }, []);

  const loadKhachLaptop = async () => {
    const result = await axios.get('http://103.57.222.114:10000/api/laptop');
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

  const handleChangeStatus = (value) => {
    setStatusName(value);
    const result = [];
    data.forEach(item => {
      if (item.trangthai === value) {
        result.push(item);
      }
    });
    setFilterStatus(result);
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
      <div className={classes.boxSearch}>
        <select
          onChange={(e) => handleChangeStatus(e.target.value)}
          className={classes.newStatusType}
          id="newConstructionType"
        >
          <option>---Trạng thái---</option>
          <option value="Đang triển khai">Đang triển khai</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
          <option value="Đã thanh toán">Đã thanh toán</option>
        </select>
        <input type="search" className={classes.searchTerm} placeholder="Nhập từ khóa tìm kiếm" onChange={e => setQuery(e.target.value)} />
      </div>
      {
        statusName.length !== 0 && statusName !== "---Trạng thái---"
        ? <DataGrid
            rows={search(filterStatus)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            className={classes.userData}
          />
        : <DataGrid
            rows={search(data)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            className={classes.userData}
          />
      }
    </>
  );
}
