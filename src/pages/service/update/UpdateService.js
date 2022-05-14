import React, { useState, useEffect  } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
  useParams,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";

const url = 'http://localhost:8000/api/service/';

export default function UpdateService () {
  var classes = useStyles();
  let history  = useHistory();

  const paramId = useParams();
  const currentId = paramId.id;

  const [ tengoidv, setTengoidv ] = useState('');
  const [ motagoidv, setMotagoidv ] = useState('');

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const result = await axios.get(url + currentId);
    setTengoidv(result.data.tengoidv);
    setMotagoidv(result.data.motagoidv);
  };

  const handleUpdateService = (e) => {
    e.preventDefault();

    const updateService = {
      tengoidv: tengoidv,
      motagoidv: motagoidv,
    }

    axios.put(url + currentId, updateService)
    .then(res => {
      alert('Cập nhật dịch vụ thành công!');
      history.push('/app/dich-vu');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Cập nhật dịch vụ" />
      <div className={classes.newUserForm}>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Tên gói dịch vụ (*)</label>
            <input type="text" name="tengoidv" className={classes.inputName} value={tengoidv} onChange={(e) => setTengoidv(e.target.value)} placeholder='Nhập tên gói dịch vụ...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Mô tả gói dịch vụ</label>
            <textarea rows="4" name="motagoidv" className={classes.inputName} value={motagoidv} onChange={(e) => setMotagoidv(e.target.value)} placeholder='Nhập mô tả gói dịch vụ...'></textarea>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleUpdateService}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
}
