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

const url_khach_website = `http://localhost:8000/api/website/`;

export default function KhachWebsitePage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    loadKhachWebsite();
  }, []);

  const loadKhachWebsite = async () => {
    const result = await axios.get('http://localhost:8000/api/website');
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

  // function getDateTime(params) {
  //   var timeStamp = params.row.createdAt;
  //   var date = new Date(timeStamp).toLocaleDateString("vi-VI");
  //   var time = new Date(timeStamp).toLocaleTimeString("vi-VI");
  //   return date + ' - ' + time;
  // }

  const columns = [
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'website', headerName: 'Website', width: 250 },
    { field: 'nhanvienphutrach', headerName: 'Nhân viên phụ trách', width: 200 },
    { 
      field: 'service', 
      headerName: 'Gói dịch vụ', 
      width: 180, 
      valueGetter: (params) => `${params.row.service.tengoidv}` 
    },
    { field: 'goidungluong', headerName: 'Gói dung lượng', width: 150 },
    // { field: 'createdAt', headerName: 'Ngày đăng ký', valueGetter: getDateTime, width: 200 },
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

  const search = (rows) => {
    return rows.filter(
      (website) =>
        website.hoten.toLowerCase().indexOf(query) > -1 ||
        website.hoten.indexOf(query) > -1 ||
        website.phone.toLowerCase().indexOf(query) > -1 ||
        website.phone.indexOf(query) > -1 ||
        website.website.toLowerCase().indexOf(query) > -1 ||
        website.website.indexOf(query) > -1 ||
        website.nhanvienphutrach.toLowerCase().indexOf(query) > -1 ||
        website.nhanvienphutrach.indexOf(query) > -1 ||
        website.trangthai.toLowerCase().indexOf(query) > -1 ||
        website.trangthai.indexOf(query) > -1
    );
  }

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
        // sortingOrder={['desc', 'asc']}
        // initialState={{
        //   sorting: {
        //     sortModel: [
        //       {
        //         field: 'id',
        //         sort: 'desc',
        //       },
        //     ],
        //   },
        // }}
      />
    </>
  );
}
