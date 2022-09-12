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

export default function EmailPage () {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    loadEmail();
  }, []);

  const loadEmail = async () => {
    const result = await axios.get(`${URL}/api/email`);
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
      <PageTitle title="Danh sách Email" button={(
        <Link to="/app/them-email">
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
                            <h1>{item.tengoi} <Link to={"/app/sua-email/" + item.id} className="icon-edit"><EditIcon /></Link></h1>
                            <p>Dung lượng: <strong>{item.dungluong}</strong></p>
                            <p>Địa chỉ Email: <strong>Không giới hạn</strong></p>
                            <p>Mã hóa SSL</p>
                            <p>Spam Assassin & Antivirus</p>
                            <p>Catch all</p>
                            <p>SPF / DKIM / DomainKeys</p>
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
