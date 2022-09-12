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

export default function NewEmail () {
  var classes = useStyles();
  let history  = useHistory();

  const [ tengoi, setTengoi ] = useState('');
  const [ chiphi, setChiPhi ] = useState('');
  const [ dungluong, setDungLuong ] = useState('');

  const handleAddEmail = (e) => {
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

    const newEmail = {
        tengoi: tengoi,
        chiphi: chiphi,
        dungluong: dungluong,
    }

    axios.post(`${URL}/api/email`, newEmail)
    .then(res => {
      alert('Thêm email thành công!');
      history.push('/app/email');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm Email Server" />
      <div className={classes.newUserForm}>
        <div className="row">
          <div className="col medium-4 small-12 large-4">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Tên gói (*)</label>
                <input type="text" name="tengoi" className={classes.inputName} value={tengoi} onChange={(e) => setTengoi(e.target.value)} placeholder='Nhập tên gói...' />
            </div>
          </div>
          <div className="col medium-4 small-12 large-4">
            <div className={classes.newUserItem}>
              <label className={classes.label}>Chi phí (*)</label>
              <input type="text" name="cmnd" className={classes.inputName} value={chiphi} onChange={(e) => setChiPhi(e.target.value)} placeholder='Nhập chi phí...' />
            </div>
          </div>
          <div className="col medium-4 small-12 large-4">
            <div className={classes.newUserItem}>
                <label className={classes.label}>Dung lượng (*)</label>
                <input type="text" name="dungluong" className={classes.inputName} value={dungluong} onChange={(e) => setDungLuong(e.target.value)} placeholder='Nhập dung lượng...' />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleAddEmail}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
