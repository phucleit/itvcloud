import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";

export default function Dashboard() {
  const [dataService, setDataService] = useState([]);
  const [serviceWebsite, setServiceWebsite] = useState('');
  const [serviceHosting, setServiceHosting] = useState('');
  const [serviceSSL, setServiceSSL] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');

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
  };  

  return (
    <div className="dashboard">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
