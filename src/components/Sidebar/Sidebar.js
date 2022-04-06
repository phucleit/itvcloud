import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonAddIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  Apps as AppsIcon,
  ListAlt as ListAltIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Trang chủ", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Tài khoản",
    link: "/app/users",
    icon: <PersonAddIcon />,
    children: [
      { label: "Danh sách tài khoản", link: "/app/users" },
      { label: "Thêm tài khoản", link: "/app/new-user" },
      { label: "Nhóm người dùng", link: "/app/roles" },
      { label: "Thêm nhóm người dùng", link: "/app/new-role" },
    ],
  },
  {
    id: 2,
    label: "Quản lý đơn hàng",
    link: "/app/order",
    icon: <SettingsIcon />,
    children: [
      { label: "Danh sách đơn hàng", link: "/app/order" },
      { label: "Thêm đơn hàng mới", link: "/app/new-order" },
    ],
  },
  // {
  //   id: 3,
  //   label: "Quản lý công trình",
  //   link: "/app/constructions",
  //   icon: <AppsIcon />,
  //   children: [
  //     { label: "Danh sách công trình", link: "/app/constructions" },
  //     { label: "Thêm công trình mới", link: "/app/new-construction" },
  //   ],
  // },
  { id: 4, label: "Tạo báo cáo", link: "", icon: <ListAltIcon /> },
  { id: 5, label: "Cấu hình hệ thống", link: "", icon: <BackupIcon /> },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
