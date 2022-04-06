import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";

const URL_SERVICE_TYPE = 'https://backend.omcloud.vn/api/service-type';
const URL_ADD_SERVICE = 'https://backend.omcloud.vn/api/service';

export default function NewService() {
  var classes = useStyles();
  let history  = useHistory();

  const [ serviceType, setServiceType ] = useState([]);
  const [ serviceTypeID, setServiceTypeID ] = useState('');
  const [ serviceName, setServiceName ] = useState('');

  useEffect(() => {
    loadServicesType();
  }, []);

  const loadServicesType = async () => {
    const result = await axios.get(URL_SERVICE_TYPE);
    setServiceType(result.data.data);
  };

  const Type = serviceType.map(Type => Type.name)

  const handleTypeChange = (e) => {
    setServiceTypeID(e.target.value);
  }

  const handleAddService = (e) => {
    e.preventDefault();
    if (serviceName === "") {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    }

    const newService = {
      name: serviceName,
      type_id: serviceTypeID,
    }

    axios.post(URL_ADD_SERVICE, newService)
    .then(res => {
      alert('Thêm dịch vụ thành công!');
      history.push('/app/services');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Thêm dịch vụ mới" />
      <div className={classes.newServiceForm}>
        <div className={classes.newServiceItem}>
            <label className={classes.label}>Tên dịch vụ</label>
            <input type="text" name="tendichvu" placeholder='Nhập tên dịch vụ...' className={classes.inputName} value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
        </div>
        <div className={classes.newServiceItem}>
          <label className={classes.label}>Loại dịch vụ</label>
          <select
            onChange={e => handleTypeChange(e)}
            className={classes.newServiceType}
            id="newServiceType"
          >
            <option>-----</option>
            {
              Type.map((name, key) => <option key={key + 1} value={key + 1}>{name}</option>)
            }
          </select>
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newServiceBtn}
          onClick={handleAddService}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}