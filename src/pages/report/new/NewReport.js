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

export default function NewReport () {
  var classes = useStyles();
  let history  = useHistory();

  const [ hoten, setHoten ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ loaimay, setLoaiMay ] = useState('');
  const [ mamay, setMaMay] = useState('');
  const [ tinhtrangmay, setTinhTrangMay ] = useState('');
  const [ image, setImage ] = useState('');
  const [ noidung, setNoiDung ] = useState('');

  const handleAddReport = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
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

    const formDataTask = new FormData();
    formDataTask.append('hoten', hoten);
    formDataTask.append('phone', phone);
    formDataTask.append('loaimay', loaimay);
    formDataTask.append('mamay', mamay);
    formDataTask.append('tinhtrangmay', tinhtrangmay);
    formDataTask.append('image[]', image);
    formDataTask.append('noidung', noidung);

    axios.post(`${URL}/api/report`, formDataTask)
    .then(res => {
      alert('Thêm báo cáo thành công!');
      history.push('/app/bao-cao');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm báo cáo" />
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
              <label className={classes.label}>Số điện thoại (*)</label>
              <input type="text" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Loại máy (*)</label>
              <input type="text" name="loaimay" className={classes.inputName} value={loaimay} onChange={(e) => setLoaiMay(e.target.value)} placeholder='Nhập loại máy...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Mã máy</label>
              <input type="text" name="mamay" className={classes.inputName} value={mamay} onChange={(e) => setMaMay(e.target.value)} placeholder='Nhập mã máy...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Tình trạng máy (*)</label>
              <input type="text" name="tinhtrangmay" className={classes.inputName} value={tinhtrangmay} onChange={(e) => setTinhTrangMay(e.target.value)} placeholder='Nhập tình trạng máy...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Hình ảnh máy</label>
              <input type="file" multiple name="image" className={classes.inputName} onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Nội dung</label>
              <textarea rows="4" name="noidung" className={classes.inputName} value={noidung} onChange={(e) => setNoiDung(e.target.value)} placeholder='Nhập nội dung...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddReport}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
