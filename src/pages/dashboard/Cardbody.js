import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button
} from "@material-ui/core";
import {
  Link,
} from "react-router-dom";

import BarChart from "./chart/BarChart";
import PieChart from "./chart/PieChart";
import {UserData} from './Data';

import "./styles.css";

import { URL } from '../../constants';

export default function CardBody() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });


  const [dataService, setDataService] = useState([]);
  const [serviceWebsite, setServiceWebsite] = useState('');
  const [serviceHosting, setServiceHosting] = useState('');
  const [serviceSSL, setServiceSSL] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');
  const [totalPriceWebsite, setTotalPriceWebsite] = useState('');
  const [totalPriceHosting, setTotalPriceHosting] = useState('');
  const [totalPriceSSL, setTotalPriceSSL] = useState('');
  const [totalPriceEmail, setTotalPriceEmail] = useState('');

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const result = await axios.get(`${URL}/api/service`);
    console.log(result.data[1].website);

    if (result.data.length) {
      if (result.data[0].website) {
        setServiceWebsite(result.data[0].website.length);
      }

      if (result.data[1].website) {
        setServiceSSL(result.data[1].website.length);
      }

      if (result.data[2].website) {
        setServiceHosting(result.data[2].website.length);
      }

      if (result.data[3].website) {
        setServiceEmail(result.data[3].website.length);
      }

      if (result.data[0].website.length > 0) {
        const sumWebsite = result.data[0].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
        setTotalPriceWebsite(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumWebsite));
      }
  
      if (result.data[1].website.length > 0) {
        const sumSSL = result.data[1].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
        setTotalPriceSSL(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumSSL));
      }
  
      if (result.data[2].website.length > 0) {
        const sumHosting = result.data[2].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
        setTotalPriceHosting(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumHosting));   
      }
  
      if (result.data[3].website.length > 0) {
        const sumEmail = result.data[3].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
        setTotalPriceEmail(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumEmail));
      }
    }
  }; 

  return (
      <div className="row">
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i className="fas fa-globe"></i>
                <h3>TÊN MIỀN</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceWebsite ? serviceWebsite : '0'}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceWebsite ? totalPriceWebsite : '0'}</span></a>
            </ul>
            <Link to="/app/them-khach-website" className="btn-dang-ky">
              <Button
                variant="contained"
                size="small"
                color="secondary"
              >
                Đăng ký mới
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i className="fas fa-server"></i>
                <h3>HOSTING</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceHosting ? serviceHosting : '0'}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceHosting ? totalPriceHosting : '0'}</span></a>
            </ul>
            <Link to="/app/them-khach-website" className="btn-dang-ky">
              <Button
                variant="contained"
                size="small"
                color="secondary"
              >
                Đăng ký mới
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i className="fab fa-expeditedssl"></i>
                <h3>SSL</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceSSL ? serviceSSL : '0'}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceSSL ? totalPriceSSL : '0'}</span></a>
            </ul>
            <Link to="/app/them-khach-website" className="btn-dang-ky">
              <Button
                variant="contained"
                size="small"
                color="secondary"
              >
                Đăng ký mới
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i className="fas fa-envelope-open-text"></i>
                <h3>EMAIL DOANH NGHIỆP</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceEmail ? serviceEmail : '0'}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceEmail ? totalPriceEmail : '0'}</span></a>
            </ul>
            <Link to="/app/them-khach-website" className="btn-dang-ky">
              <Button
                variant="contained"
                size="small"
                color="secondary"
              >
                Đăng ký mới
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <BarChart chartData={userData} />
        </div>
        <div className="col-md-6">
          <PieChart chartData={userData} />
        </div>
      </div>
  )
}
