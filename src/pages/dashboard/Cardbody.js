import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";

export default function CardBody() {
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
    const result = await axios.get('http://103.57.222.114:10000/api/service');
    setDataService(result.data);
    setServiceWebsite(result.data[0].website.length);
    setServiceHosting(result.data[1].website.length);
    setServiceSSL(result.data[2].website.length);
    setServiceEmail(result.data[3].website.length);
    
    if (result.data[0].website.length > 0) {
      const sumWebsite = result.data[0].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
      setTotalPriceWebsite(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumWebsite));
    }

    if (result.data[1].website.length > 0) {
      const sumHosting = result.data[1].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
      setTotalPriceHosting(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumHosting));
    }

    if (result.data[2].website.length > 0) {
      const sumSSL = result.data[2].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
      setTotalPriceSSL(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumSSL));   
    }

    if (result.data[3].website.length > 0) {
      const sumEmail = result.data[3].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
      setTotalPriceEmail(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumEmail));
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
          </div>
        </div>
      </div>
  )
}
