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

const url = 'http://103.57.222.114:10000/api/website/';

export default function UpdateKhachWebsite () {
  var classes = useStyles();
  let history  = useHistory();

  const paramId = useParams();
  const currentId = paramId.id;

  const [ hoten, setHoten ] = useState('');
  const [ cmnd, setCmnd ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ website, setWebsite ] = useState('');
  const [ nhanvienphutrach, setNhanvienphutrach ] = useState('');
  const [ khuvuc, setKhuvuc ] = useState('');
  const [ ghichu, setGhichu ] = useState('');
  const [ goidl, setGoidl ] = useState('');

  const [service, setService] = useState([]);
  const [serviceID, setServiceID] = useState();

  const [status, setStatus] = useState([]);
  const [statusID, setStatusID] = useState('');

  useEffect(() => {
    loadKhachWebsite();
    loadServices();
    loadStatus();
  }, []);

  const loadKhachWebsite = async () => {
    const result = await axios.get(url + currentId);
    console.log(result.data);
    setHoten(result.data.hoten);
    setCmnd(result.data.cmnd);
    setPhone(result.data.phone);
    setWebsite(result.data.website);
    setNhanvienphutrach(result.data.nhanvienphutrach);
    setKhuvuc(result.data.khuvuc);
    setGoidl(result.data.goidungluong);
    setServiceID(result.data.service.id);
    setStatusID(result.data.status.id);
    setGhichu(result.data.ghichu);
  };

  const loadServices = async () => {
    const result = await axios.get('http://103.57.222.114:10000/api/service');
    setService(result.data);
  };

  const Service = service.map(Service => Service);

  const handleServiceChange = (e) => {
    setServiceID(e.target.value);
  }

  const loadStatus = async () => {
    const result = await axios.get('http://103.57.222.114:10000/api/status');
    setStatus(result.data);
  };

  const Status = status.map(Status => Status);

  const handleStatusChange = (e) => {
    setStatusID(e.target.value);
  }

  const handleUpdateKhachWebsite = (e) => {
    e.preventDefault();
    if (hoten === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (cmnd === "") {
      alert("Vui lòng nhập cmnd");
      return;
    }

    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (website === "") {
      alert("Vui lòng nhập tên website");
      return;
    }

    if (nhanvienphutrach === "") {
      alert("Vui lòng nhập nhập nhân viên phụ trách");
      return;
    }

    if (khuvuc === "") {
      alert("Vui lòng nhập khu vực");
      return;
    }

    const updateKhachWebsite = {
      hoten: hoten,
      cmnd: cmnd,
      phone: phone,
      website: website,
      nhanvienphutrach: nhanvienphutrach,
      khuvuc: khuvuc,
      goidungluong: goidl,
      service: serviceID,
      status: statusID,
      ghichu: ghichu
    }

    axios.put(url + currentId, updateKhachWebsite)
    .then(res => {
      alert('Cập nhật khách thành công!');
      history.push('/app/khach-website');
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <PageTitle title="Cập nhật khách website" />
      <div className={classes.newUserForm}>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Họ tên (*)</label>
            <input type="text" name="hoten" className={classes.inputName} value={hoten} onChange={(e) => setHoten(e.target.value)} placeholder='Nhập họ tên...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Cmnd (*)</label>
            <input type="text" name="cmnd" className={classes.inputName} value={cmnd} onChange={(e) => setCmnd(e.target.value)} placeholder='Nhập cmnd...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Số điện thoại (*)</label>
            <input type="text" name="phone" className={classes.inputName} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Nhập số điện thoại...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Website (*)</label>
            <input type="text" name="website" className={classes.inputName} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder='Nhập tên website...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Nhân viên phụ trách (*)</label>
            <input type="text" name="nhanvienphutrach" className={classes.inputName} value={nhanvienphutrach} onChange={(e) => setNhanvienphutrach(e.target.value)} placeholder='Nhập nhân viên phụ trách...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Khu vực (*)</label>
            <input type="text" name="khuvuc" className={classes.inputName} value={khuvuc} onChange={(e) => setKhuvuc(e.target.value)} placeholder='Nhập khu vực...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Gói dung lượng</label>
            <input type="text" name="goidl" className={classes.inputName} value={goidl} onChange={(e) => setGoidl(e.target.value)} placeholder='Nhập gói dung lượng...' />
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Tên gói dịch vụ</label>
            <select
              onChange={e => handleServiceChange(e)}
              className={classes.newUserType}
              id="newServiceType"
              value={serviceID}
            >
              <option>-----</option>
              {
                Service.map((name, key) => <option key={name.id} value={name.id}>{name.tengoidv}</option>)
              }
            </select>
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Trạng thái</label>
            <select
              onChange={e => handleStatusChange(e)}
              className={classes.newUserType}
              id="newServiceType"
              value={statusID}
            >
              <option>-----</option>
              {
                Status.map((name, key) => <option key={name.id} value={name.id}>{name.name}</option>)
              }
            </select>
        </div>
        <div className={classes.newUserItem}>
            <label className={classes.label}>Ghi chú</label>
            <input type="text" name="ghichu" className={classes.inputName} value={ghichu} onChange={(e) => setGhichu(e.target.value)} placeholder='Nhập ghi chú...' />
        </div>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.newUserBtn}
          onClick={handleUpdateKhachWebsite}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
}
