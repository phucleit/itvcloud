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

const url_customer = `${URL}/api/customer/`;
const url_upload = `${URL}/`;

export default function CustomerPage () {
  var classes = useStyles();
  const [ data, setData ] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const result = await axios.get(`${URL}/api/customer`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_customer + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { 
        field: 'chuthe',
        headerName: 'Chủ thể', 
        width: 450,
        renderCell: (params) => {
            return(
                <>
                    {params.row.cmnd}, {params.row.diachi}, {params.row.thanhpho}, {params.row.quocgia}
                </>
            );
        }
    },
    { 
        field: 'CMND', 
        headerName: 'CMND', 
        width: 250,
        renderCell: (params) => {
          if (params.row.cmnd_mat_truoc || params.row.cmnd_mat_sau) {
            return(
              <div>
                {
                  params.row.cmnd_mat_truoc ? 
                    <a href={`${url_upload}` + params.row.cmnd_mat_truoc} target="_blank">
                      <img src={`${url_upload}` + params.row.cmnd_mat_truoc} style={{width: '120px', padding: '5px'}} />
                    </a>
                  : <img src={'./placeholder_add_image.png'} style={{width: '120px', padding: '5px'}} />
                }

                {
                  params.row.cmnd_mat_sau ? 
                    <a href={`${url_upload}` + params.row.cmnd_mat_sau} target="_blank">
                      <img src={`${url_upload}` + params.row.cmnd_mat_sau} style={{width: '120px', padding: '5px'}} />
                    </a>
                  : <img src={'./placeholder_add_image.png'} style={{width: '120px', padding: '5px'}} />
                }
              </div>
            );
          } else {
            return(
              <div>
                <img src={'./placeholder_add_image.png'} style={{width: '120px', padding: '5px'}} />
              </div>
            );
          }
        }
    },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-khach-hang/" + params.row.id}>
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
      (customer) =>
        customer.hoten.toLowerCase().indexOf(query) > -1 ||
        customer.hoten.indexOf(query) > -1 ||
        customer.phone.toLowerCase().indexOf(query) > -1 ||
        customer.phone.indexOf(query) > -1 ||
        customer.email.toLowerCase().indexOf(query) > -1 ||
        customer.email.indexOf(query) > -1 
    );
  }

  return (
    <>
      <PageTitle title="Danh sách bản khai khách hàng" button={(
        <Link to="/app/them-khach-hang">
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
