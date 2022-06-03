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
    
    const sumWebsite = result.data[0].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
    setTotalPriceWebsite(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumWebsite));

    const sumHosting = result.data[1].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
    setTotalPriceHosting(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumHosting));

    const sumSSL = result.data[2].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
    setTotalPriceSSL(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumSSL));   

    const sumEmail = result.data[3].website.map(datum => datum.chiphi).reduce((a, b) => a + b);
    setTotalPriceEmail(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumEmail));
  }; 

  return (
      <div className="row">
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i class="fas fa-globe"></i>
                <h3>TÊN MIỀN</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceWebsite}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceWebsite}</span></a>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i class="fas fa-server"></i>
                <h3>HOSTING</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceHosting}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceHosting}</span></a>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i class="fab fa-expeditedssl"></i>
                <h3>SSL</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceSSL}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceSSL}</span></a>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <ul className="list-group">
              <div className="header-title">
                <i class="fas fa-envelope-open-text"></i>
                <h3>EMAIL DOANH NGHIỆP</h3>
              </div>
              <a className="list-group-item">Dịch vụ đang sử dụng <span className="badge-1">{serviceEmail}</span></a>
              <a className="list-group-item">Dịch vụ sắp hết hạn <span className="badge-2">00</span></a>
              <a className="list-group-item">Dịch vụ hết hạn <span className="badge-3">00</span></a>
              <a className="list-group-item">Tổng chi phí dịch vụ <span className="badge-4">{totalPriceEmail}</span></a>
            </ul>
          </div>
        </div>
      </div>
  )
}
