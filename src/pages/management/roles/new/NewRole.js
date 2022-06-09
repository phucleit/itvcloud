import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";

// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { URL } from '../../../../constants';

export default function NewRole () {
  var classes = useStyles();
  let history  = useHistory();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [permission, setPermission] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    loadPermission();
  }, []);

  const loadPermission = async () => {
    const result = await axios.get(`${URL}/api/permission`);
    setPermission(result.data);
  };

  let listPermission = {};
  permission.forEach((item) => {
    if (!(item.group_name in listPermission)) {
      listPermission[item.group_name] = [];
    }
    listPermission[item.group_name].push(item);
  });

  let handleChangeRoleOne = (e) => {
    if (e.target.checked === true) {
      setPermissions([...permissions, e.target.value]);
    } else {
      let check_list = [];
      permissions.forEach(check => {
        if ((check) !== (e.target.value)) {
          check_list.push((check));
        }
      });
      setPermissions(check_list);
    }
  }

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
        permissions: permissions
      };

      axios.post(`${URL}/api/role`, newRole)
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
                    <label>Quản lý tài khoản</label>
                    {
                      Object.entries(listPermission).slice(0, 1).map(role_1 =>
                        role_1[1].map(
                          (value_1) =>
                            <div className={classes.checkPermission}>
                              <input type="checkbox" key={value_1.id} value={value_1.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_1.title}</label>
                            </div>
                        )
                      )
                    }
                </div>
                <div className={classes.itemPermisstion}>
                    <label>Quản lý khách laptop</label>
                    {
                      Object.entries(listPermission).slice(2, 3).map(role_2 =>
                        role_2[1].map(
                          (value_2) =>
                            <div className={classes.checkPermission}>
                              <input type="checkbox" key={value_2.id} value={value_2.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_2.title}</label>
                            </div>
                        )
                      )
                    }
                </div>
                <div className={classes.itemPermisstion}>
                    <label>Quản lý khách website</label>
                    {
                      Object.entries(listPermission).slice(3, 6).map(role_3 =>
                        role_3[1].map(
                          (value_3) =>
                            <div className={classes.checkPermission}>
                              <input type="checkbox" key={value_3.id} value={value_3.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_3.title}</label>
                            </div>
                        )
                      )
                    }
                </div>
                <div className={classes.itemPermisstion}>
                    <label>Quản lý dịch vụ</label>
                    {
                      Object.entries(listPermission).slice(1, 2).map(role_4 =>
                        role_4[1].map(
                          (value_4) =>
                            <div className={classes.checkPermission}>
                              <input type="checkbox" key={value_4.id} value={value_4.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_4.title}</label>
                            </div>
                        )
                      )
                    }
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
