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
import { URL } from '../../../constants';

const url_report = `${URL}/api/report/`;
const url_upload = `${URL}/`;

export default function ReportPage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const result = await axios.get(`${URL}/api/report`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_report + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'loaimay', headerName: 'Loại máy', width: 150 },
    { field: 'tinhtrangmay', headerName: 'Tình trạng máy', width: 200 },
    { 
        field: 'image', 
        headerName: 'Hình ảnh máy', 
        width: 200,
        renderCell: (params) => {
            return(
                <img src={`${url_upload}` + params.row.image} style={{width: '100px'}} />
            );
        }
    },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-bao-cao/" + params.row.id}>
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
      (report) =>
        report.hoten.toLowerCase().indexOf(query) > -1 ||
        report.hoten.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title="Danh sách báo cáo" button={(
        <Link to="/app/them-bao-cao">
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
        pageSize={50}
        rowsPerPageOptions={[50]}
        disableSelectionOnClick
        className={classes.userData}
      />
    </>
  );
}
