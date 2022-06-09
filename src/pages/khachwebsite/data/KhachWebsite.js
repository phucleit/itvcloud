import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {
  Link,
} from "react-router-dom";
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { URL } from '../../../constants';

const url_khach_website = `${URL}/api/website/`;

export default function KhachWebsitePage () {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [ query, setQuery ] = useState('');
  const [dataStatus, setDataStatus] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [statusName, setStatusName] = useState('');
  const [dataService, setDataService] = useState([]);
  const [filterService, setFilterService] = useState([]);
  const [serviceName, setServiceName] = useState('');

  const [ dataLength, setDataLength ] = useState('');

  const [ countWebsiteExpired, setCountWebsiteExpired ] = useState('');
  const [ countWebsiteToExpired, setCountWebsiteToExpired ] = useState('');
  

  useEffect(() => {
    loadKhachWebsite();
    loadServices();
    loadStatus();
    loadWebsiteExpired();
    loadWebsiteToExpired();
  }, []);

  /* count website expired */
  const loadWebsiteExpired = async () => {
    const result = await axios.get(`${URL}/api/website/website/expired`);
    setCountWebsiteExpired(result.data.length);
  }
  /* end count website expired */

  /* count website to expired */
  const loadWebsiteToExpired = async () => {
    const result = await axios.get(`${URL}/api/website/website/toexpired`);
    setCountWebsiteToExpired(result.data.length);
  }
  /* end count website expired */

  /* website */
  const loadKhachWebsite = async () => {
    const result = await axios.get(`${URL}/api/website`);
    setData(result.data);
    setDataLength(result.data.length);
  };
  /* end website */

  /* services */
  const loadServices = async () => {
    const result = await axios.get(`${URL}/api/service`);
    setDataService(result.data);
  };

  const Service = dataService.map(Service => Service);

  const handleChangeService = (value) => {
    setServiceName(value);
    const result = [];
    data.forEach(item => {
      if (item.service.length > 0) {
        if (item.service.tengoidv === value) {
          result.push(item);
        }
      }
    });
    setFilterService(result);
  }
  /* end services */

  /* loadStatus */
  const loadStatus = async () => {
    const result = await axios.get(`${URL}/api/status`);
    setDataStatus(result.data);
  };

  const Status = dataStatus.map(Status => Status);

  const handleChangeStatus = (value) => {
    setStatusName(value);
    const result = [];
    data.forEach(item => {
      if (item.status.name.length > 0) {
        if (item.status.name === value) {
          result.push(item);
        }
      }
    });
    setFilterStatus(result);
  }
  /* end loadStatus */

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_khach_website + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  function getCreatedAt(params) {
    var timeStamp = params.row.createdAt;
    var date = new Date(timeStamp).toLocaleDateString("vi-VI");
    var time = new Date(timeStamp).toLocaleTimeString("vi-VI");
    return date + ' - ' + time;
  }

  function getExpiredAt(params) {
    var timeStamp = params.row.expiredAt;
    var date = new Date(timeStamp).toLocaleDateString("vi-VI");
    var time = new Date(timeStamp).toLocaleTimeString("vi-VI");
    return date + ' - ' + time;
  }

  const columns = [
    { field: 'hoten', headerName: 'Họ tên', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'website', headerName: 'Website', width: 250 },
    { 
      field: 'service', 
      headerName: 'Gói dịch vụ', 
      width: 180, 
      valueGetter: (params) => `${params.row.service.tengoidv}` 
    },
    { field: 'createdAt', headerName: 'Ngày đăng ký', valueGetter: getCreatedAt, width: 200 },
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: getExpiredAt, width: 200 },
    { 
      field: 'status', 
      headerName: 'Trạng thái', 
      width: 180, 
      valueGetter: (params) => `${params.row.status.name}` 
    },
    {
      field: 'hanhDong',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/sua-khach-website/" + params.row.id}>
              <i className="fas fa-edit"></i>
            </Link>
            <DeleteOutline className={classes.userListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (website) =>
        website.hoten.toLowerCase().indexOf(query) > -1 ||
        website.hoten.indexOf(query) > -1 ||
        website.phone.toLowerCase().indexOf(query) > -1 ||
        website.phone.indexOf(query) > -1 ||
        website.website.toLowerCase().indexOf(query) > -1 ||
        website.website.indexOf(query) > -1 ||
        website.nhanvienphutrach.toLowerCase().indexOf(query) > -1 ||
        website.nhanvienphutrach.indexOf(query) > -1
    );
  }

  const handleUseWebsite = async (e) => {
    const result = await axios.get(`${URL}/api/website`);
    setData(result.data);
  }

  const handleAboutWebsite = (e) => {
    const result = await axios.get(`${URL}/api/website/website/toexpired`);
    setData(result.data);
  }

  const handleExpiredWebsite = async (e) => { 
    const result = await axios.get(`${URL}/api/website/website/expired`);
    setData(result.data);
  }

  return (
    <>
      <PageTitle title="Danh sách khách website" button={(
        <Link to="/app/them-khach-website">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            Thêm mới
          </Button>
        </Link>
      )} />
      <div className={classes.boxSearch}>
        <Button
          variant="contained"
          size="medium"
          className={classes.boxUse}
          onClick={handleUseWebsite}
        >
          Đang sử dụng: {dataLength ? dataLength : '0'}
        </Button>
        <Button
          variant="contained"
          size="medium"
          className={classes.boxAbout}
          onClick={handleAboutWebsite}
        >
          Sắp hết hạn: {countWebsiteToExpired ? countWebsiteToExpired : '0'}
        </Button>
        <Button
          variant="contained"
          size="medium"
          className={classes.boxExpire}
          onClick={handleExpiredWebsite}
        >
          Hết hạn: {countWebsiteExpired ? countWebsiteExpired : '0'}
        </Button>
        <select
          onChange={(e) => handleChangeService(e.target.value)}
          className={classes.newServiceType}
          id="newConstructionType"
        >
          <option>---Dịch vụ---</option>
          {
            Service.map((name, key) => <option key={name.id} value={name.tengoidv}>{name.tengoidv}</option>)
          }
        </select>
        <select
          onChange={(e) => handleChangeStatus(e.target.value)}
          className={classes.newStatusType}
          id="newConstructionType"
        >
          <option>---Trạng thái---</option>
          {
            Status.map((name, key) => <option key={name.id} value={name.name}>{name.name}</option>)
          }
        </select>
        <input type="search" className={classes.searchTerm} placeholder="Nhập từ khóa tìm kiếm" onChange={e => setQuery(e.target.value)} />
      </div>
      {
        statusName.length !== 0 && statusName !== "---Trạng thái---"
        ? <DataGrid
            rows={search(filterStatus)}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
            disableSelectionOnClick
            className={classes.userData}
          />
        : <DataGrid
            rows={search(data)}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
            disableSelectionOnClick
            className={classes.userData}
          />
      }

      {/* {
        serviceName.length !== 0 && serviceName !== "---Dịch vụ---"
        ? <DataGrid
            rows={search(filterService)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            className={classes.userData}
          />
        : <DataGrid
            rows={search(data)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            className={classes.userData}
          />
      } */}
    </>
  );
}
