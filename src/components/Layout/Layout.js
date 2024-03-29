import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box} from '@material-ui/core'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Users from '../../pages/management/users/data';
import NewUser from '../../pages/management/users/new';
import UpdateUser from '../../pages/management/users/update';
import Roles from '../../pages/management/roles/data';
import NewRole from '../../pages/management/roles/new';
import KhachLaptopPage from '../../pages/khachlaptop/data';
import NewKhachLaptop from '../../pages/khachlaptop/new';
import UpdateKhachLaptop from '../../pages/khachlaptop/update';
import KhachWebsitePage from '../../pages/khachwebsite/data';
import NewKhachWebsite from '../../pages/khachwebsite/new';
import UpdateKhachWebsite from '../../pages/khachwebsite/update';
import ServicePage from '../../pages/service/data';
import NewService from '../../pages/service/new';
import UpdateService from '../../pages/service/update';
import ReportPage from '../../pages/report/data';
import NewReport from '../../pages/report/new';
import UpdateReport from '../../pages/report/update';
import CustomerPage from '../../pages/customer/data';
import NewCustomer from '../../pages/customer/new';
import UpdateCustomer from '../../pages/customer/update';
import Hosting from '../../pages/reseller/hosting/data';
import NewHosting from '../../pages/reseller/hosting/new';
import UpdateHosting from '../../pages/reseller/hosting/update';
import Email from '../../pages/reseller/email/data';
import NewEmail from '../../pages/reseller/email/new';
import UpdateEmail from '../../pages/reseller/email/update';
import SSL from '../../pages/reseller/ssl/data';
import NewSSL from '../../pages/reseller/ssl/new';
import UpdateSSL from '../../pages/reseller/ssl/update';

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/tai-khoan" component={Users} />
              <Route path="/app/them-tai-khoan" component={NewUser} />
              <Route path="/app/sua-tai-khoan/:id" component={UpdateUser} />
              <Route path="/app/roles" component={Roles} />
              <Route path="/app/new-role" component={NewRole} />
              <Route path="/app/khach-laptop" component={KhachLaptopPage} />
              <Route path="/app/them-khach-laptop" component={NewKhachLaptop} />
              <Route path="/app/sua-khach-laptop/:id" component={UpdateKhachLaptop} />
              <Route path="/app/khach-website" component={KhachWebsitePage} />
              <Route path="/app/them-khach-website" component={NewKhachWebsite} />
              <Route path="/app/sua-khach-website/:id" component={UpdateKhachWebsite} />
              <Route path="/app/dich-vu" component={ServicePage} />
              <Route path="/app/them-dich-vu" component={NewService} />
              <Route path="/app/sua-dich-vu/:id" component={UpdateService} />
              <Route path="/app/bao-cao" component={ReportPage} />
              <Route path="/app/them-bao-cao" component={NewReport} />
              <Route path="/app/sua-bao-cao/:id" component={UpdateReport} />
              <Route path="/app/khach-hang" component={CustomerPage} />
              <Route path="/app/them-khach-hang" component={NewCustomer} />
              <Route path="/app/sua-khach-hang/:id" component={UpdateCustomer} />
              <Route path="/app/hosting" component={Hosting} />
              <Route path="/app/them-hosting" component={NewHosting} />
              <Route path="/app/sua-hosting/:id" component={UpdateHosting} />
              <Route path="/app/email" component={Email} />
              <Route path="/app/them-email" component={NewEmail} />
              <Route path="/app/sua-email/:id" component={UpdateEmail} />
              <Route path="/app/ssl" component={SSL} />
              <Route path="/app/them-ssl" component={NewSSL} />
              <Route path="/app/sua-ssl/:id" component={UpdateSSL} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                Copyright © 2021 ITV SCLOUD
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
