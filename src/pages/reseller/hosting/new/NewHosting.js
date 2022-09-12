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

export default function NewHosting () {
  var classes = useStyles();
  let history  = useHistory();

  const [ tengoi, setTengoi ] = useState('');
  const [ chiphi, setChiPhi ] = useState('');
  const [ dungluong, setDungLuong ] = useState('');
  const [ bangthong, setBangThong ] = useState('');
  const [ subdomain, setSubDomain ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ ftp, setFtp ] = useState('');
  const [ database, setDatabase ] = useState('');

  const handleAddHosting = (e) => {
    e.preventDefault();
    if (tengoi === "") {
        alert("Vui lòng nhập tên gói");
        return;
    }

    if (chiphi === "") {
        alert("Vui lòng nhập chi phí");
        return;
    }

    if (dungluong === "") {
        alert("Vui lòng nhập dung lượng");
        return;
    }

    const newHosting = {
        tengoi: tengoi,
        chiphi: chiphi,
        dungluong: dungluong,
        bangthong: bangthong,
        subdomain: subdomain,
        email: email,
        ftp: ftp,
        database: database
    }

    axios.post(`${URL}/api/hosting`, newHosting)
    .then(res => {
      alert('Thêm hosting thành công!');
      history.push('/app/hosting');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm Hosting" />
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
                <label className={classes.label}>Dung lượng (*)</label>
                <input type="text" name="dungluong" className={classes.inputName} value={dungluong} onChange={(e) => setDungLuong(e.target.value)} placeholder='Nhập dung lượng...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Băng thông</label>
              <input type="text" name="bangthong" className={classes.inputName} value={bangthong} onChange={(e) => setBangThong(e.target.value)} placeholder='Nhập băng thông...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Sub-domain</label>
                <input type="text" name="subdomain" className={classes.inputName} value={subdomain} onChange={(e) => setSubDomain(e.target.value)} placeholder='Nhập số lượng sub-domain...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Email</label>
              <input type="text" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập số lượng email...' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
                <label className={classes.label}>FTP</label>
                <input type="text" name="ftp" className={classes.inputName} value={ftp} onChange={(e) => setFtp(e.target.value)} placeholder='Nhập FTP...' />
            </div>
          </div>
          <div className="col medium-6 small-12 large-6">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Database</label>
              <input type="text" name="database" className={classes.inputName} value={database} onChange={(e) => setDatabase(e.target.value)} placeholder='Nhập số lượng database...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddHosting}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
