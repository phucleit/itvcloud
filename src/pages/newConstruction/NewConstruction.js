import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import {
  useHistory,
} from "react-router-dom";
import axios from 'axios';

export default function NewConstruction() {
  var classes = useStyles();
  let history  = useHistory();

  const [ name, setName ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ representative, setRepresentative ] = useState('');
  const [ representative_tel, setRepresentativeTel ] = useState('');
  const [ representative_mail, setRepresentativeMail ] = useState('');
  const [ person_in_charge, setPersonInCharge ] = useState('');

  const [ service, setService ] = useState([]);
  const [ serviceID, setServiceID ] = useState();

  const [ serviceType, setServiceType ] = useState([]);
  const [ serviceTypeID, setServiceTypeID ] = useState('');

  useEffect(() => {
    loadServicesType();
    loadServices();
  }, []);

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setService(result.data.data);
  };

  const Service = service.map(Service => Service);

  const handleServiceChange = (e) => {
    setServiceID(e.target.value);
  }

  const loadServicesType = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service-type');
    setServiceType(result.data.data);
  };

  const Type = serviceType.map(Type => Type.name)

  const handleTypeChange = (e) => {
    setServiceTypeID(e.target.value);
  }

  const handleAddConstruction = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    } else if (address === "") {
      alert("Vui lòng nhập địa điểm");
      return;
    } else if (representative === "") {
      alert("Vui lòng nhập họ tên đại diện");
      return;
    } else if (representative_tel === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    } else if (representative_mail === "") {
      alert("Vui lòng nhập email");
      return;
    } else if (person_in_charge === "") {
      alert("Vui lòng nhập nhân sự phụ trách");
      return;
    } else {
      const newConstruction = {
        name: name,
        address: address,
        representative: representative,
        representative_tel: representative_tel,
        representative_mail: representative_mail,
        person_in_charge: person_in_charge,
        service_id: serviceID,
        service_type_id: serviceTypeID
      };

      axios.post('https://backend.omcloud.vn/api/construction', newConstruction)
      .then(res => {
        alert('Thêm công trình thành công!');
        history.push('/app/constructions');
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <>
      <PageTitle title="Thêm công trình mới" />
      <div className={classes.newConstructionForm}>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Tên công trình</label>
            <input type="text" name="tencongtrinh" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder='Nhập tên công trình...' />
        </div>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Địa điểm</label>
            <input type="text" name="diadiem" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Nhập địa điểm...' />
        </div>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Họ tên đại diện</label>
            <input type="text" name="hotendaidien" className={classes.inputName} value={representative} onChange={(e) => setRepresentative(e.target.value)} placeholder='Nhập họ tên đại diện...' />
        </div>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Điện thoại đại diện</label>
            <input type="tel" name="dienthoaidaidien" className={classes.inputName} value={representative_tel} onChange={(e) => setRepresentativeTel(e.target.value)} placeholder='Nhập điện thoại đại diện...' />
        </div>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Email đại diện</label>
            <input type="email" name="emaildaidien" className={classes.inputName} value={representative_mail} onChange={(e) => setRepresentativeMail(e.target.value)} placeholder='Nhập email đại diện...' />
        </div>
        <div className={classes.newConstructionItem}>
            <label className={classes.label}>Nhân sự phụ trách</label>
            <input type="text" name="nhansuphutrach" className={classes.inputName} value={person_in_charge} onChange={(e) => setPersonInCharge(e.target.value)} placeholder='Nhập nhân sự phụ trách...' />
        </div>
        <div className={classes.newConstructionItem}>
          <label className={classes.label}>Dịch vụ cung cấp</label>
          <select
            onChange={e => handleServiceChange(e)}
            className={classes.newConstructionType} 
            id="newConstructionType"
          >
            <option>-----</option>
            {
              Service.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
            }
          </select>
        </div>
        <div className={classes.newConstructionItem}>
          <label className={classes.label}>Loại dịch vụ</label>
          <select
            onChange={e => handleTypeChange(e)}
            className={classes.newConstructionType}
            id="newConstructionType"
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
          className={classes.newConstructionBtn}
          onClick={handleAddConstruction}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}