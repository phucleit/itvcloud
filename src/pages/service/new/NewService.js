import React, { useState } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { URL } from '../../../constants';

export default function NewService () {
  var classes = useStyles();
  let history  = useHistory();

  const [ tengoidv, setTengoidv ] = useState('');
  const [ motagoidv, setMotagoidv ] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (tengoidv === "") {
      alert("Vui lòng nhập tên gói dịch vụ");
      return;
    }

    const newService = {
      tengoidv: tengoidv,
      motagoidv: motagoidv,
    }

    axios.post(`${URL}/api/service`, newService)
    .then(res => {
      alert('Thêm dịch vụ thành công!');
      history.push('/app/dich-vu');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm dịch vụ" />
      <div className={classes.newUserForm}>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Tên gói dịch vụ (*)</label>
            <input type="text" name="tengoidv" className={classes.inputName} value={tengoidv} onChange={(e) => setTengoidv(e.target.value)} placeholder='Nhập tên gói dịch vụ...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Mô tả gói dịch vụ</label>
            <textarea rows="4" name="motagoidv" className={classes.inputName} value={motagoidv} onChange={(e) => setMotagoidv(e.target.value)} placeholder='Nhập mô tả gói dịch vụ...'></textarea>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddService}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
