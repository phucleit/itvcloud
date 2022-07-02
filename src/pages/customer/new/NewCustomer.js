import React, { useState } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { URL } from '../../../constants';

export default function NewCustomer () {
  var classes = useStyles();
  let history  = useHistory();

  const [ hoten, setHoten ] = useState('');
  const [ gioitinh, setGioiTinh ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ ngaysinh, setNgaySinh ] = useState('');
  const [ cmnd, setCMND ] = useState('');
  const [ cmnd_mat_truoc, setHinhMatTruoc ] = useState('');
  const [ cmnd_mat_sau, setHinhMatSau ] = useState('');
  const [ diachi, setDiaChi ] = useState('');
  const [ thanhpho, setThanhPho ] = useState('');
  const [ quocgia, setQuocGia ] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (email === "") {
      alert("Vui lòng nhập email");
      return;
    }

    if (cmnd === "") {
      alert("Vui lòng nhập cmnd");
      return;
    }

    if (diachi === "") {
      alert("Vui lòng nhập địa chỉ");
      return;
    }

    const formDataTask = new FormData();
    formDataTask.append('hoten', hoten);
    formDataTask.append('gioitinh', gioitinh);
    formDataTask.append('phone', phone);
    formDataTask.append('email', email);
    formDataTask.append('ngaysinh', ngaysinh);
    formDataTask.append('cmnd', cmnd);
    formDataTask.append('cmnd_mat_truoc', cmnd_mat_truoc);
    formDataTask.append('cmnd_mat_sau', cmnd_mat_sau);
    formDataTask.append('diachi', diachi);
    formDataTask.append('thanhpho', thanhpho);
    formDataTask.append('quocgia', quocgia);

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    };

    axios.post(`${URL}/api/customer`, formDataTask, config)
    .then(res => {
      alert('Thêm bản khai khách hàng thành công!');
      history.push('/app/khach-hang');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm bản khai khách hàng" />
      <div className={classes.newUserForm}>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Họ tên (*)</label>
              <input type="text" name="hoten" className={classes.inputName} value={hoten} onChange={(e) => setHoten(e.target.value)} placeholder='Nhập họ tên...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Giới tính</label>
              <input type="text" name="gioitinh" className={classes.inputName} value={gioitinh} onChange={(e) => setGioiTinh(e.target.value)} placeholder='Nhập giới tính...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Số điện thoại (*)</label>
              <input type="text" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Email (*)</label>
              <input type="text" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập email...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Ngày sinh</label>
              <DatePicker 
                dateFormat="dd/MM/yyyy" 
                selected={ngaysinh} 
                onChange={date => setNgaySinh(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>CMND (*)</label>
              <input type="text" name="cmnd" className={classes.inputName} value={cmnd} onChange={(e) => setCMND(e.target.value)}  placeholder='Nhập cmnd...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>CMND mặt trước</label>
              <input type="file" name="cmnd_mat_truoc" className={classes.inputName} onChange={(e) => setHinhMatTruoc(e.target.files[0])} />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
            <label className={classes.label}>CMND mặt sau</label>
              <input type="file" name="cmnd_mat_sau" className={classes.inputName} onChange={(e) => setHinhMatSau(e.target.files[0])} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-12 small-12 large-12">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Địa chỉ (*)</label>
              <input type="text" name="diachi" className={classes.inputName} value={diachi} onChange={(e) => setDiaChi(e.target.value)} placeholder='Nhập địa chỉ...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Thành phố</label>
              <input type="text" name="thanhpho" className={classes.inputName} value={thanhpho} onChange={(e) => setThanhPho(e.target.value)} placeholder='Nhập thành phố...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Quốc gia</label>
              <input type="text" name="quocgia" className={classes.inputName} value={quocgia} onChange={(e) => setQuocGia(e.target.value)} placeholder='Nhập quốc gia...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddCustomer}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
