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

export default function NewKhachWebsite () {
  var classes = useStyles();
  let history  = useHistory();

  const [ hoten, setHoten ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ website, setWebsite ] = useState('');
  const [ nhanvienphutrach, setNhanvienphutrach ] = useState('');
  const [ trangthai, setTrangthai ] = useState('');
  const [ khuvuc, setKhuvuc ] = useState('');
  const [ ghichu, setGhichu ] = useState('');
  const [ goidl, setGoidl ] = useState('');

  const handleAddKhachWebsite = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (website === "") {
      alert("Vui lòng nhập tên website");
      return;
    }

    if (nhanvienphutrach === "") {
      alert("Vui lòng nhập nhập nhân viên phụ trách");
      return;
    }

    if (trangthai === "") {
      alert("Vui lòng nhập trạng thái");
      return;
    }

    if (khuvuc === "") {
      alert("Vui lòng nhập khu vực");
      return;
    }

    if (goidl === "") {
      alert("Vui lòng nhập gói dung lượng");
      return;
    }

    const newKhachwebsite = {
      hoten: hoten,
      phone: phone,
      website: website,
      nhanvienphutrach: nhanvienphutrach,
      trangthai: trangthai,
      khuvuc: khuvuc,
      goidungluong: goidl,
      ghichu: ghichu,
    }

    axios.post('http://localhost:8000/api/website', newKhachwebsite)
    .then(res => {
      alert('Thêm khách thành công!');
      history.push('/app/khach-website');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm khách website" />
      <div className={classes.newUserForm}>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Họ tên (*)</label>
            <input type="text" name="hoten" className={classes.inputName} value={hoten} onChange={(e) => setHoten(e.target.value)} placeholder='Nhập họ tên...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Số điện thoại (*)</label>
            <input type="text" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Website (*)</label>
            <input type="text" name="website" className={classes.inputName} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder='Nhập tên website...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Nhân viên phụ trách (*)</label>
            <input type="text" name="nhanvienphutrach" className={classes.inputName} value={nhanvienphutrach} onChange={(e) => setNhanvienphutrach(e.target.value)} placeholder='Nhập nhân viên phụ trách...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Trạng thái (*)</label>
            <input type="text" name="trangthai" className={classes.inputName} value={trangthai} onChange={(e) => setTrangthai(e.target.value)} placeholder='Nhập trạng thái...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Khu vực (*)</label>
            <input type="text" name="khuvuc" className={classes.inputName} value={khuvuc} onChange={(e) => setKhuvuc(e.target.value)} placeholder='Nhập khu vực...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Gói dung lượng (*)</label>
            <input type="text" name="goidl" className={classes.inputName} value={goidl} onChange={(e) => setGoidl(e.target.value)} placeholder='Nhập gói dung lượng...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Ghi chú</label>
            <input type="text" name="ghichu" className={classes.inputName} value={ghichu} onChange={(e) => setGhichu(e.target.value)} placeholder='Nhập ghi chú...' />
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddKhachWebsite}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
