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
import Users from '../../pages/management/users';
import NewUser from '../../pages/management/newUser';
import Roles from '../../pages/management/roles';
import NewRole from '../../pages/management/newRole';
import Services from "../../pages/services";
import NewService from "../../pages/newService";
import Constructions from "../../pages/constructions";
import NewConstruction from "../../pages/newConstruction";

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
              <Route path="/app/users" component={Users} />
              <Route path="/app/new-user" component={NewUser} />
              <Route path="/app/roles" component={Roles} />
              <Route path="/app/new-role" component={NewRole} />
              {/* <Route
                exact
                path="/app"
                render={() => <Redirect to="/app/services" />}
              /> */}
              <Route path="/app/services" component={Services} />
              <Route path="/app/new-service" component={NewService} />
              <Route path="/app/constructions" component={Constructions} />
              <Route path="/app/new-construction" component={NewConstruction} />
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
