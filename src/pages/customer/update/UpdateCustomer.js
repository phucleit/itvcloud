import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
  useParams
} from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { URL } from '../../../constants';

const url_khach_hang = `${URL}/api/customer/`;
const url_upload = `${URL}/`;

export default function UpdateCustomer () {
  var classes = useStyles();
  let history  = useHistory();

  const paramId = useParams();
  const currentId = paramId.id;

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

  const [ review_cmnd_mat_truoc, setReviewHinhMatTruoc ] = useState('');
  const [ review_cmnd_mat_sau, setReviewHinhMatSau ] = useState('');
  const [ isMatTruocPicked, setIsMatTruocPicked ] = useState(false);
  const [ isMatSauPicked, setIsMatSauPicked ] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const result = await axios.get(url_khach_hang + currentId);
    setHoten(result.data.hoten);
    setGioiTinh(result.data.gioitinh);
    setPhone(result.data.phone);
    setEmail(result.data.email);
    setNgaySinh(result.data.ngaysinh);
    setCMND(result.data.cmnd);
    setDiaChi(result.data.diachi);
    setThanhPho(result.data.thanhpho);
    setQuocGia(result.data.quocgia);
    setReviewHinhMatTruoc(result.data.cmnd_mat_truoc);
    setReviewHinhMatSau(result.data.cmnd_mat_sau);
  };

  function getNgaySinh() {
    var timeStamp = ngaysinh;
    var date = new Date(timeStamp).toLocaleDateString("vi-VI");
    return date;
  }

  const changeHinhMatTruoc = (event) => {
		setIsMatTruocPicked(true);
		setHinhMatTruoc(event.target.files[0]);
	};

  const changeHinhMatSau = (event) => {
		setIsMatSauPicked(true);
		setHinhMatSau(event.target.files[0]);
	};

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui l??ng nh???p h??? t??n");
      return;
    }

    if (phone === "") {
      alert("Vui l??ng nh???p s??? ??i???n tho???i");
      return;
    }

    if (email === "") {
      alert("Vui l??ng nh???p email");
      return;
    }

    if (cmnd === "") {
      alert("Vui l??ng nh???p cmnd");
      return;
    }

    if (diachi === "") {
      alert("Vui l??ng nh???p ?????a ch???");
      return;
    }

    const formDataTask = new FormData();
    formDataTask.append('hoten', hoten);
    formDataTask.append('gioitinh', gioitinh);
    formDataTask.append('phone', phone);
    formDataTask.append('email', email);
    formDataTask.append('ngaysinh', ngaysinh);
    formDataTask.append('cmnd', cmnd);

    if (isMatTruocPicked == true) {
      formDataTask.append('cmnd_mat_truoc', cmnd_mat_truoc);
    }

    if (isMatSauPicked == true) {
      formDataTask.append('cmnd_mat_sau', cmnd_mat_sau);
    }
    
    formDataTask.append('diachi', diachi);
    formDataTask.append('thanhpho', thanhpho);
    formDataTask.append('quocgia', quocgia);

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    };

    axios.put(`${URL}/api/customer/` + currentId, formDataTask, config)
    .then(res => {
      alert('C???p nh???t b???n khai kh??ch h??ng th??nh c??ng!');
      history.push('/app/khach-hang');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="S???a b???n khai kh??ch h??ng" />
      <div className={classes.newUserForm}>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>H??? t??n (*)</label>
              <input type="text" name="hoten" className={classes.inputName} value={hoten} onChange={(e) => setHoten(e.target.value)} placeholder='Nh???p h??? t??n...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Gi???i t??nh</label>
              <input type="text" name="gioitinh" className={classes.inputName} value={gioitinh} onChange={(e) => setGioiTinh(e.target.value)} placeholder='Nh???p gi???i t??nh...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>S??? ??i???n tho???i (*)</label>
              <input type="text" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nh???p s??? ??i???n tho???i...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Email (*)</label>
              <input type="text" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nh???p email...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Ng??y sinh</label>
              <DatePicker 
                dateFormat="dd/MM/yyyy"
                value={getNgaySinh(ngaysinh)}
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
              <input type="text" name="cmnd" className={classes.inputName} value={cmnd} onChange={(e) => setCMND(e.target.value)}  placeholder='Nh???p cmnd...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>CMND m???t tr?????c</label>
              <input type="file" name="cmnd_mat_truoc" className={classes.inputName} onChange={changeHinhMatTruoc} />
              {review_cmnd_mat_truoc ? <img src={`${url_upload}` + review_cmnd_mat_truoc} style={{width: '250px', marginTop: '20px'}} /> : <img src={'./placeholder_add_image.png'} style={{width: '250px', marginTop: '20px'}} />}
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
            <label className={classes.label}>CMND m???t sau</label>
              <input type="file" name="cmnd_mat_sau" className={classes.inputName} onChange={changeHinhMatSau} />
              {review_cmnd_mat_sau ? <img src={`${url_upload}` + review_cmnd_mat_sau} style={{width: '250px', marginTop: '20px'}} /> : <img src={'./placeholder_add_image.png'} style={{width: '250px', marginTop: '20px'}} />}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>?????a ch??? (*)</label>
              <input type="text" name="diachi" className={classes.inputName} value={diachi} onChange={(e) => setDiaChi(e.target.value)} placeholder='Nh???p ?????a ch???...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Th??nh ph???</label>
              <input type="text" name="thanhpho" className={classes.inputName} value={thanhpho} onChange={(e) => setThanhPho(e.target.value)} placeholder='Nh???p th??nh ph???...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleUpdateCustomer}
        >
          C???p nh???t
        </Button>
      </div>
    </>
  );
}
