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

export default function NewUser () {
  var classes = useStyles();
  let history  = useHistory();

  // const [ roles, setRoles ] = useState([]);
  // const [ roleID, setRoleID ] = useState('');

  const [ hoten, setHoten ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');

  useEffect(() => {
    // loadRoles();
  }, []);

  // const loadRoles = async () => {
  //   const result = await axios.get('https://624d0001d71863d7a8125b73.mockapi.io/roles');
  //   setRoles(result.data);
  // };

  // const Role = roles.map(Role => Role)

  // const handleRolesChange = (e) => {
  //   setRoleID(e.target.value);
  // }

  const handleAddUser = (e) => {
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
    }

    axios.post('http://103.57.222.114:10000/api/user', newUser)
    .then(res => {
      alert('Thêm tài khoản thành công!');
      history.push('/app/tai-khoan');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm tài khoản" />
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
            <input type="password" name="password" className={classes.inputName} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Email</label>
            <input type="email" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập email...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Điện thoại</label>
            <input type="tel" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
        </div>
        {/* <div className={classes.newUserItem}>
          <label className={classes.label}>Nhóm</label>
          <select
            onChange={e => handleRolesChange(e)}
            className={classes.newUserType}
            id="newUserType"
          >
            <option>-----</option>
            {
                Role.map((value, key) => <option key={value.id} value={value.id}>{value.title}</option>)
            }
          </select>
        </div> */}
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddUser}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
