import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonAddIcon,
  Laptop as LaptopIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  ListAlt as ListAltIcon,
  Group as GroupIcon,
  AddShoppingCart as AddShoppingCartIcon
} from "@material-ui/icons";
import WebIcon from '@material-ui/icons/Web';
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
    link: "/app/tai-khoan",
    icon: <PersonAddIcon />,
    children: [
      { label: "Danh sách tài khoản", link: "/app/tai-khoan" },
      { label: "Thêm tài khoản", link: "/app/them-tai-khoan" },
      { label: "Nhóm người dùng", link: "/app/roles" },
      { label: "Thêm nhóm người dùng", link: "/app/new-role" },
    ],
  },
  // {
  //   id: 2,
  //   label: "Quản lý khách laptop",
  //   link: "/app/khach-laptop",
  //   icon: <LaptopIcon />,
  //   children: [
  //     { label: "Danh sách", link: "/app/khach-laptop" },
  //     { label: "Thêm mới", link: "/app/them-khach-laptop" },
  //   ],
  // },
  {
    id: 3,
    label: "Quản lý khách website",
    link: "/app/khach-website",
    icon: <WebIcon />,
    children: [
      { label: "Danh sách", link: "/app/khach-website" },
      { label: "Thêm mới", link: "/app/them-khach-website" },
    ],
  },
  {
    id: 4,
    label: "Dịch vụ",
    link: "/app/dich-vu",
    icon: <SettingsIcon />,
    children: [
      { label: "Hosting", link: "/app/hosting" },
      { label: "Danh sách", link: "/app/dich-vu" },
      { label: "Thêm mới", link: "/app/them-dich-vu" },
    ],
  },
  {
    id: 5,
    label: "Khách hàng",
    link: "/app/khach-hang",
    icon: <GroupIcon />,
    children: [
      { label: "Danh sách", link: "/app/khach-hang" },
      { label: "Thêm mới", link: "/app/them-khach-hang" },
    ],
  },
  {
    id: 6,
    label: "Đăng ký mới",
    link: "/app/dang-ky-moi",
    icon: <AddShoppingCartIcon />,
    children: [
      { label: "Đăng ký Tên Miền", link: "/app/them-khach-hang" },
      { label: "Đăng ký Hosting", link: "/app/them-hosting" },
      { label: "Đăng ký Email Server", link: "/app/them-khach-hang" },
      { label: "Đăng ký SSL", link: "/app/them-khach-hang" },
      { label: "Đăng ký Cloud Server", link: "/app/them-khach-hang" },
    ],
  },
  // { 
  //   id: 7, 
  //   label: "Tạo báo cáo", 
  //   link: "/app/bao-cao", 
  //   icon: <ListAltIcon />,
  //   children: [
  //     { label: "Danh sách", link: "/app/bao-cao" },
  //     { label: "Thêm mới", link: "/app/them-bao-cao" },
  //   ],
  // },
  // { id: 7, label: "Cấu hình hệ thống", link: "", icon: <BackupIcon /> },
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
