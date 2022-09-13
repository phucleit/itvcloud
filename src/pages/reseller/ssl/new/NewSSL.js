import React, { useState } from "react";
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

export default function NewSSL () {
  var classes = useStyles();
  let history  = useHistory();

  const [ tengoi, setTengoi ] = useState('');
  const [ chiphi, setChiPhi ] = useState('');
  const [ chinhsachbaohiem, setChinhSachBaoHiem ] = useState('');
  const [ domainbaomat, setDomainBaoMat ] = useState('');
  const [ dotincay, setDoTinCay ] = useState('');
  const [ address, setAddress ] = useState('');

  const handleAddSSL = (e) => {
    e.preventDefault();
    if (tengoi === "") {
        alert("Vui lòng nhập tên gói");
        return;
    }

    if (chiphi === "") {
        alert("Vui lòng nhập chi phí");
        return;
    }

    const newSSL = {
        tengoi: tengoi,
        chiphi: chiphi,
        chinhsachbaohiem: chinhsachbaohiem,
        domainbaomat: domainbaomat,
        dotincay: dotincay,
        address: address
    }

    axios.post(`${URL}/api/ssl`, newSSL)
    .then(res => {
      alert('Thêm ssl thành công!');
      history.push('/app/ssl');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm SSL" />
      <div className={classes.newUserForm}>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Tên gói (*)</label>
                <input type="text" name="tengoi" className={classes.inputName} value={tengoi} onChange={(e) => setTengoi(e.target.value)} placeholder='Nhập tên gói...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Chi phí (*)</label>
              <input type="text" name="cmnd" className={classes.inputName} value={chiphi} onChange={(e) => setChiPhi(e.target.value)} placeholder='Nhập chi phí...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Chi phí chính sách bảo hiểm</label>
                <input type="text" name="chinhsachbaohiem" className={classes.inputName} value={chinhsachbaohiem} onChange={(e) => setChinhSachBaoHiem(e.target.value)} placeholder='Nhập chi phí chính sách bảo hiểm...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Số domain được bảo mật</label>
              <input type="text" name="domainbaomat" className={classes.inputName} value={domainbaomat} onChange={(e) => setDomainBaoMat(e.target.value)} placeholder='Nhập số domain bảo mật...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Độ tin cậy</label>
                <input type="text" name="dotincay" className={classes.inputName} value={dotincay} onChange={(e) => setDoTinCay(e.target.value)} placeholder='Nhập độ tin cậy...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Thanh địa chỉ màu xanh</label>
              <input type="text" name="address" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Nhập thanh địa chỉ màu xanh...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddSSL}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
