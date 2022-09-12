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

const url_email = `${URL}/api/email/`;

export default function UpdateEmail () {
  var classes = useStyles();
  let history  = useHistory();

  const paramId = useParams();
  const currentId = paramId.id;

  const [ tengoi, setTengoi ] = useState('');
  const [ chiphi, setChiPhi ] = useState('');
  const [ dungluong, setDungLuong ] = useState('');

  useEffect(() => {
    loadDetailEmail();
  }, []);

  const loadDetailEmail = async () => {
    const result = await axios.get(url_email + currentId);
    setTengoi(result.data.tengoi);
    setChiPhi(result.data.chiphi);
    setDungLuong(result.data.dungluong);
  };

  const handleUpdateEmail = (e) => {
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

    const updateEmail = {
        tengoi: tengoi,
        chiphi: chiphi,
        dungluong: dungluong
    }

    axios.put(url_email + currentId, updateEmail)
    .then(res => {
      alert('Cập nhật thông tin email thành công!');
      history.push('/app/email');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Cập nhật Email Server" />
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
          onClick={handleUpdateEmail}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
}
