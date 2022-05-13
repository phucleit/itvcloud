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

export default function NewKhachLaptop () {
  var classes = useStyles();
  let history  = useHistory();

  const [ hoten, setHoten ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ diachi, setDiachi ] = useState('');
  const [ loaimay, setLoaimay ] = useState('');
  const [ mamay, setMamay ] = useState('');
  const [ tinhtrangmay, setTinhtrangmay ] = useState('');
  const [ noidung, setNoidung ] = useState('');
  const [ chiphi, setChiphi ] = useState('');
  const [ trangthai, setTrangthai ] = useState('');
  const [ phuongthuctt, setPhuongthuctt ] = useState('');

  const handleAddKhachLaptop = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (diachi === "") {
      alert("Vui lòng nhập địa chỉ");
      return;
    }

    if (loaimay === "") {
      alert("Vui lòng nhập loại máy");
      return;
    }

    if (tinhtrangmay === "") {
      alert("Vui lòng nhập tình trạng máy");
      return;
    }

    if (trangthai === "") {
      alert("Vui lòng nhập trạng thái");
      return;
    }

    const newKhachlaptop = {
      hoten: hoten,
      phone: phone,
      diachi: diachi,
      loaimay: loaimay,
      mamay: mamay,
      tinhtrangmay: tinhtrangmay,
      noidung: noidung,
      chiphi: chiphi,
      trangthai: trangthai,
      phuongthucthanhtoan: phuongthuctt,
    }

    axios.post('http://localhost:8000/api/laptop', newKhachlaptop)
    .then(res => {
      alert('Thêm khách thành công!');
      history.push('/app/khach-laptop');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm khách laptop" />
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
            <label className={classes.label}>Địa chỉ (*)</label>
            <input type="text" name="diachi" className={classes.inputName} value={diachi} onChange={(e) => setDiachi(e.target.value)} placeholder='Nhập địa chỉ...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Loại máy (*)</label>
            <input type="text" name="loaimay" className={classes.inputName} value={loaimay} onChange={(e) => setLoaimay(e.target.value)} placeholder='Nhập loại máy...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Mã máy</label>
            <input type="text" name="mamay" className={classes.inputName} value={mamay} onChange={(e) => setMamay(e.target.value)} placeholder='Nhập mã máy...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Tình trạng máy (*)</label>
            <input type="text" name="tinhtrangmay" className={classes.inputName} value={tinhtrangmay} onChange={(e) => setTinhtrangmay(e.target.value)} placeholder='Nhập tình trạng máy...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Nội dung</label>
            <input type="text" name="noidung" className={classes.inputName} value={noidung} onChange={(e) => setNoidung(e.target.value)} placeholder='Nhập nội dung...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Chi phí</label>
            <input type="text" name="chiphi" className={classes.inputName} value={chiphi} onChange={(e) => setChiphi(e.target.value)} placeholder='Nhập chi phí...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Trạng thái (*)</label>
            <input type="text" name="trangthai" className={classes.inputName} value={trangthai} onChange={(e) => setTrangthai(e.target.value)} placeholder='Nhập trạng thái...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Phương thức thanh toán</label>
            <input type="text" name="phuongthuctt" className={classes.inputName} value={phuongthuctt} onChange={(e) => setPhuongthuctt(e.target.value)} placeholder='Nhập phương thức thanh toán...' />
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddKhachLaptop}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
