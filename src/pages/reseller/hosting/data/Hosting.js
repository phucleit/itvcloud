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

const url_hosting = `${URL}/api/hosting/`;

export default function HostingPage () {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    loadHosting();
  }, []);

  const loadHosting = async () => {
    const result = await axios.get(`${URL}/api/hosting`);
    setData(result.data);
    console.log(result.data);
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
      <PageTitle title="Danh sách hosting" button={(
        <Link to="/app/them-hosting">
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
                            <h1>{item.tengoi} <Link to={"/app/sua-hosting/" + item.id} className="icon-edit"><EditIcon /></Link></h1>
                            <p>Dung lượng: <strong>{item.dungluong} [SSD]</strong></p>
                            <p>Băng thông: <strong>{item.bangthong}</strong></p>
                            <p>Sub-domain: <strong>{item.subdomain}</strong></p>
                            <p>Email: <strong>{item.email}</strong></p>
                            <p>FTP: <strong>{item.ftp}</strong></p>
                            <p>Database: <strong>{item.database}</strong></p>
                            <p>Giá chỉ từ</p>
                            <h4>{(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.chiphi))} / tháng</h4>
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
