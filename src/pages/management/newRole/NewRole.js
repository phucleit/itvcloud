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

export default function NewRole () {
  var classes = useStyles();
  let history  = useHistory();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const handleAddRole = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Vui lòng nhập tên nhóm");
      return;
    } else if (description === "") {
      alert("Vui lòng nhập mô tả nhóm");
      return;
    } else {
      const newRole = {
        title: title,
        description: description,
        permissions: []
      };

      axios.post('https://624d0001d71863d7a8125b73.mockapi.io/roles', newRole)
      .then(res => {
        alert('Thêm người dùng thành công!');
        history.push('/app/roles');
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <>
      <PageTitle title="Thêm nhóm người dùng" />
      <div className={classes.newRolesForm}>
        <div className={classes.newRolesItem}>
            <label className={classes.label}>Tên nhóm</label>
            <input type="text" name="tennhom" className={classes.inputName} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Nhập tên nhóm...' />
        </div>
        <div className={classes.newRolesItem}>
            <label className={classes.label}>Mô tả nhóm</label>
            <textarea rows="4" name="motanhom" className={classes.inputName} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Nhập mô tả nhóm...'></textarea>
        </div>
        <div className={classes.newRolesItem}>
            <label className={classes.label}>Phân quyền</label>
            <div className={classes.listPermission}>
                <div className={classes.itemPermisstion}>
                    <label>Tài khoản</label>
                    
                </div>
                <div className={classes.itemPermisstion}>
                    <label>Quản lý đơn hàng</label>
                    
                </div>
                <div className={classes.itemPermisstion}>
                    <label>Quản lý khách hàng</label>
                    
                </div>
            </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newRoleBtn}
          onClick={handleAddRole}
        >
          Tạo nhóm
        </Button>
      </div>
    </>
  );
}
