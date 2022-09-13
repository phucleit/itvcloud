import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import {
  Link,
} from "react-router-dom";
import {
    Edit as EditIcon
  } from "@material-ui/icons";
import "./styles.css";

// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { URL } from '../../../../constants';

export default function SSL () {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    loadSSL();
  }, []);

  const loadSSL = async () => {
    const result = await axios.get(`${URL}/api/ssl`);
    setData(result.data);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <PageTitle title="Danh sách SSL" button={(
        <Link to="/app/them-ssl">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            Thêm mới
          </Button>
        </Link>
      )} />
      <Grid container spacing={2}>
        {
            data.map((item, i) => {
                return (
                    <Grid item xs={3}>
                        <Item className="product-item">
                            <h1>{item.tengoi} <Link to={"/app/sua-ssl/" + item.id} className="icon-edit"><EditIcon /></Link></h1>
                            <p>Chính sách bảo hiểm: <strong>${item.chinhsachbaohiem}</strong></p>
                            <p>Số domain được bảo mật: <strong>{item.domainbaomat}</strong></p>
                            <p>Độ tin cậy: <strong>{item.dotincay}</strong></p>
                            <p>Thanh địa chỉ màu xanh: <strong>{item.address}</strong></p>
                            <p>SANs: <strong>Không có</strong></p>
                            <p>Giá chỉ từ</p>
                            <h4>{(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.chiphi))} / 12 tháng</h4>
                            <p>(Giá trên chưa bao gồm VAT)</p>
                        </Item>
                    </Grid>
                );
            })
        }
      </Grid>
    </>
  );
}
