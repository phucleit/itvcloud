import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
  useParams,
} from "react-router-dom";

// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { URL } from '../../../../constants';

const url_user = `${URL}/api/user/`;

export default function UpdateUser () {
  var classes = useStyles();
  let history  = useHistory();

  const paramId = useParams();
  const currentId = paramId.id;

  const [ hoten, setHoten ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');

  const [roles, setRoles] = useState([]);
  const [roleID, setRoleID] = useState('');

  useEffect(() => {
    loadUser();
    loadRoles();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(url_user + currentId);
    setHoten(result.data.hoten);
    setUsername(result.data.username);
    setPassword(result.data.password);
    setEmail(result.data.email);
    setPhone(result.data.phone);
    setRoleID(result.data.roles.id);
  };

  const loadRoles = async () => {
    const result = await axios.get(`${URL}/api/role`);
    setRoles(result.data);
  };

  const Role = roles.map(Role => Role)

  const handleRolesChange = (e) => {
    setRoleID(e.target.value);
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (username === "") {
      alert("Vui lòng nhập username");
      return;
    }

    if (password === "") {
      alert("Vui lòng nhập mật khẩu");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    const newUser = {
      hoten: hoten,
      username: username,
      password: password,
      email: email,
      phone: phone,
      roles: roleID
    }

    axios.put(url_user + currentId, newUser)
    .then(res => {
      alert('Cập nhật tài khoản thành công!');
      history.push('/app/tai-khoan');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Cập nhật tài khoản" />
      <div className={classes.newUserForm}>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Họ tên</label>
            <input type="text" name="hoten" className={classes.inputName} value={hoten} onChange={(e) => setHoten(e.target.value)} placeholder='Nhập họ tên...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Username</label>
            <input type="text" name="username" className={classes.inputName} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Nhập username...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Mật khẩu</label>
            <input disabled type="password" name="password" className={classes.inputName} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Email</label>
            <input type="email" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập email...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Điện thoại</label>
            <input type="tel" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
        </div>
        <div className={classes.newUserItem}>
          <label className={classes.label}>Nhóm</label>
          <select
            onChange={e => handleRolesChange(e)}
            className={classes.newUserType}
            id="newUserType"
            value={roleID}
          >
            <option>-----</option>
            {
                Role.map((value, key) => <option key={value.id} value={value.id}>{value.title}</option>)
            }
          </select>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleUpdateUser}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
}
